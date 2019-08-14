import { Component, OnInit } from '@angular/core';
import { MoviePickerService } from 'src/app/services/movie-picker.service';
import { MovieContentService } from 'src/app/services/movie-content.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [MoviePickerService, MovieContentService]
})
export class QuizComponent implements OnInit {
  /**
   * Total number of movie questions where user guesses the
   * correct movie with the help of provided clues
   */
  totalNumberOfMovies = 5;

  /**
   * Array of movie orders in the quiz
   */
  moviesOrder: number[] = this.numToArray(this.totalNumberOfMovies);

  /**
   * This list contains 100 recent and popular movies
   */
  moviesList: any[] = [];

  /**
   * Contains 15 titles (3 movie options per a question)
   */
  titlesAndIds: any[] = [];

  /**
   * Contains 5 objects of the movies to be guessed
   */
  moviesToBeGuessed: any[] = [];

  moviePicks = this.moviePickerService
                   .moviesPicks;

  quizProgress = 0;

  quizCorrect = 0;


  constructor(private moviePickerService: MoviePickerService,
              private movieContentService: MovieContentService) { }

  incrementQuizProgress() {
    this.quizProgress += 20;
  }

  incrementQuizCorrect() {
    this.quizCorrect += 20;
  }

  /**
   * Method returns an array of numbers starting from 1 to param(num)
   * for ngFor that renders the wanted number of movies for the quiz
   *
   * @param   num number of movies that will be displayed
   * @returns     numbers array
   * @example     [1, 2, 3] for param(num) = 3
   */
  numToArray(num: number): number[] {
    /* Creates array filled with the number, then takes their key
       and creates an array out of them, then increments them by 1 */
    return [...Array(num).keys()].map(item => item + 1);
  }

  /**
   * Get position of a movie in movie picks matrix
   *
   * @param questionOrder   0-4 (5 questions in quiz)
   * @param movieOrder      0-2 (3 movie options per question)
   */
  getMoviePositionInList(questionOrder: number,
                         movieOrder: number): number {
    if ((questionOrder < 5 &&
            movieOrder < 3)
            && (
         questionOrder >= 0 &&
            movieOrder >= 0)) {
    return this.moviePickerService.moviesPicks
                  [questionOrder]
                  [movieOrder];
    } else {
      console.log(
        'Movie position in list outside of range (quiz.component.ts)'
        );
    }
  }

  /**
   * Stores 100 movies into the component variable
   *
   * @see  moviesList
   */
  setMoviesList() {
    return this.movieContentService
    .getMoviesObservables()
    .pipe(
      map(moviesPages => {
        for (const moviesPage of moviesPages) {
          this.moviesList.push(...moviesPage.results);
        } // end for
      }) // end cb & map
    ); // end pipe
  }

  /**
   * Extracts the quiz' movie titles
   *
   * @see  getMoviePositionInList()
   */
  setTitlesAndIds() {
    const titlePosition = 'title';
    const idPosition = 'id';
    for (let i = 0; i < 5; i++) {
      this.titlesAndIds.push([]);
      for (let j = 0; j < 3; j++) {
        this.titlesAndIds[i]
        .push({
          id:    this.moviesList
                 [this.getMoviePositionInList(i, j)]
                [idPosition],

          title: this.moviesList
                 [this.getMoviePositionInList(i, j)]
                 [titlePosition]
        }); // end push
      } // end for (j)
    } // end for (i)
  }

  /**
   * Extracts the quiz' movie IDs
   *
   * @see  getMoviePositionInList()
   */
  setMoviesObjects() {
    const id = 'id';
    for (let i = 0; i < 5; i++) {
      this.moviesToBeGuessed
      .push({
        order: this.moviesOrder[i],

        id:    this.moviesList
               [this.moviePickerService.moviesGuessed[i]]
               [id]
      }); // end object & push
    } // end for
  }

  /**
   * All quiz logic handling movie list data must be passed as
   * a callback function to this method due to data being assigned
   * to compopenent variables from an observable
   *
   * Otherwise all of the logic is executed prior to data being
   * assigned to the component variables
   * (which will result in variables being undefined)
   *
   * @param cb              callback function
   * @see   setMoviesList()
   */
  quizLogic(cb) {
    this.setMoviesList().subscribe(cb);
  }

  /**
   * Creates a quiz
   */
  createQuiz() {
    // Picks 15 numbers out of 100
    this.moviePickerService.pickMoviesMatrix();

    // Picks 5 numbers out of the 15 picks
    this.moviePickerService.moviesToGuess(this
      .moviePicks);

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
