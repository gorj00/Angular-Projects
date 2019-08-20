import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoviePickerService } from 'src/app/services/movie-picker.service';
import { MovieContentService } from 'src/app/services/movie-content.service';
import { Router, Event as NavigationEvent } from '@angular/router';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounceIn } from 'ng-animate';
import { map } from 'rxjs/operators';

// Interface import
import { IMoviesPage } from '../../interfaces/movies-page.interface';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  animations: [
    trigger('bounceIn', [transition('* => *', useAnimation(bounceIn))])
  ],
  providers: [MoviePickerService, MovieContentService]
})
export class MovieComponent implements OnInit, OnDestroy {

  moviesTotal: number = this.movieContentService
                            .moviesTotal;
  moviesOrder: number[] = this.numToArray(
                            this.moviesTotal
                          );
  moviePicks: number[][] = this.moviePickerService
                               .moviesPicks;
  questionRendered: boolean;
  loadingStatus = true;
  currentRoute: string = this.router.url;
  quizProgress = 0;
  quizCorrect = 0;
  bounceIn: any;
  moviesList: IMoviesPage['results'] = [];

  titlesAndIds: {
    id: number, title: string
  }[][] = [];

  moviesToBeGuessed: {
    order: number, id: number
  }[] = [];

  constructor(private moviePickerService: MoviePickerService,
              private movieContentService: MovieContentService,
              private router: Router) {}

  incrementQuizProgress() {
    this.quizProgress += 100 / this.moviesTotal;
  }

  incrementQuizCorrect() {
    this.quizCorrect += 100 / this.moviesTotal;
  }

  onChooseChangeRouter() {
    return this.router.events
      .subscribe(
        (event: NavigationEvent) => {
          this.currentRoute = this.router.url;
        },
        error => console.log(error)
      );
  }

  numToArray(num: number): number[] {
    return [...Array(num).keys()].map(item => item + 1);
  }

  getMoviePositionInList(questionOrder: number,
                         movieOrder: number): number {
    if ((questionOrder < this.moviesTotal && movieOrder <= 2) &&
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
    for (let i = 0; i < this.moviesTotal; i++) {
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
    for (let i = 0; i < this.moviesTotal; i++) {
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

      // Handling changing of the router and loading another question
      this.onChooseChangeRouter();

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

  ngOnDestroy() {
    this.onChooseChangeRouter()
        .unsubscribe();
  }
}
