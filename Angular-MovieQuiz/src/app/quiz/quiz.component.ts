import { Component, OnInit } from '@angular/core';
import { MoviePickerService } from 'src/app/services/movie-picker.service';
import { MovieContentService } from 'src/app/services/movie-content.service';
import { map } from 'rxjs/operators';

// Interface import
import { IMoviesPage } from '../interfaces/movies-page.interface';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [MoviePickerService, MovieContentService]
})
export class QuizComponent implements OnInit {

  totalNumberOfMovies = 5;
  moviesOrder: number[] = this.numToArray(this.totalNumberOfMovies);
  moviePicks: number[][] = this.moviePickerService.moviesPicks;
  moviesList: IMoviesPage['results'] = [];
  loadingStatus = true;
  quizProgress = 0;
  quizCorrect = 0;
  titlesAndIds: {
    id: number, title: string
  }[][] = [];
  moviesToBeGuessed: {
    order: number, id: number
  }[] = [];

  constructor(private moviePickerService: MoviePickerService,
              private movieContentService: MovieContentService) {}

  incrementQuizProgress() {
    this.quizProgress += 20;
  }

  incrementQuizCorrect() {
    this.quizCorrect += 20;
  }

  numToArray(num: number): number[] {
    return [...Array(num).keys()].map(item => item + 1);
  }

  getMoviePositionInList(questionOrder: number,
                         movieOrder: number): number {
    if ((questionOrder <= 4 && movieOrder <= 2) &&
        (questionOrder >= 0 && movieOrder >= 0)) {
      return this.moviePickerService
                 .moviesPicks
                 [questionOrder]
                 [movieOrder];
    } else {
      console.log(
        'Movie position in list outside of range (quiz.component.ts).'
      );
    }
  }

  setMoviesList() {
    return this.movieContentService.getMoviesObservables()
    .pipe(
      map(
        (moviesPages: IMoviesPage[]) => {
          for (const moviesPage of moviesPages) {
            this.moviesList.push(...moviesPage.results);
          } // end for
        } // end response
      ) // end map
    ); // end pipe
  }

  setTitlesAndIds() {
    for (let i = 0; i < 5; i++) {
      this.titlesAndIds.push([]);
      for (let j = 0; j < 3; j++) {
        this.titlesAndIds[i].push({
          id:    this.moviesList
                 [this.getMoviePositionInList(i, j)]
                 .id,

          title: this.moviesList
                 [this.getMoviePositionInList(i, j)]
                 .title
        }); // end push
      } // end for (j)
    } // end for (i)
  }

  setMoviesObjects() {
    for (let i = 0; i < 5; i++) {
      this.moviesToBeGuessed.push({
        order: this.moviesOrder[i],

        id:    this.moviesList
               [this.moviePickerService.moviesGuessed[i]]
               .id
      }); // end object & push
    } // end for
  }

  quizLogic(cb) {
    this.setMoviesList().subscribe(
      cb,
      error => console.log(error),
      () => {
        setTimeout(() => {
          this.loadingStatus = false;
        }, 500);
      }
    );
  }

  createQuiz() {
    // Picks 15 numbers out of 100
    this.moviePickerService.pickMoviesMatrix();

    // Picks 5 numbers out of the 15 picks
    this.moviePickerService.moviesToGuess(this.moviePicks);

    // Requesting and handling data for the quiz from Movie DB REST API
    this.quizLogic(() => {
      // Set and store the titles
      this.setTitlesAndIds();

      // Set and store the guessed movies IDs
      this.setMoviesObjects();

      // Test if needed
      // console.log(this.moviesList);
      // console.log(this.moviePickerService.moviesPicks);
      // console.log(this.moviePickerService.moviesGuessed);
      // console.log(this.moviesToBeGuessed);
    });
  }

  ngOnInit() {
    // Cerate a quiz on a page load
    this.createQuiz();
  }
}
