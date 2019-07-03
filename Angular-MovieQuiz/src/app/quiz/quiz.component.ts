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
   * Total number of questions where user guesses the correct
   * movie with the help of provided clues
   */
  numsOfMovies = 5;
  /**
   * This list contains 100 recent movies
   */
  moviesList: any[] = [];
  moviesTitles: any[] = [];
  movT: string;

  constructor(private moviePickerService: MoviePickerService,
              private movieContentService: MovieContentService) { }

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

  // /**
  //  * Setter for assinging observable's data into a class classProperty
  //  * outside of observable's scope
  //  *
  //  * @param classProperty
  //  * @param observableResponse
  //  */
  // setter(classProperty: any, observableResponse: any) {
  //   classProperty = observableResponse;
  // }

//   /**
//    * Stores 100 movies into the instance attribute
//    *
//    * @see  moviesList
//    */
//   setMoviesList() {
//   this.movieContentService.getMoviesList()
//     .subscribe(
//       response => {
//         this.setter(this.moviesList, response);
//         for (let i = 0; i < 5; i++) {
//           this.moviesList.push(...response[i].results);
//         }
//       },
//       error => console.log(error)
//     ); // end subscribe
//   } // end setMoviesList()

// // PROMISE
//   getMoviesPages(): Promise<any[]> {
//     const moviesList = [];
//     return new Promise(resolve => {
//       this.movieContentService.getMoviesList()
//       .subscribe(
//         response => resolve(response),
//         error => console.log(error)
//       ); // end subscribe
//     }); // end promise
//   } // end setMoviesList()

//   // setMoviesList(moviesPages) {
//   //   for (let i = 0; i < 5; i++) {
//   //     this.moviesList.push(...moviesPages[i].results);
//   //   }
//   // }

  /**
   * Get position of a movie in movie picks matrix
   * @param questionOrder   0-4 (5 questions in quiz)
   * @param movieOrder      0-2 (3 movie options per question)
   */
  getMoviePositionInList(questionOrder: number,
                         movieOrder: number): number {
    if ((questionOrder < 5 &&
            movieOrder < 3)
            && (
         questionOrder > 0 &&
            movieOrder > 0)) {
    return this.moviePickerService.moviesPicks
    [questionOrder]
    [movieOrder];
    }
  }





  /**
   * Stores 100 movies into the component variable
   *
   * @see  moviesList
   */
  setMoviesList() {
    return this.movieContentService.getMoviesObservables()
    .pipe(
      map(response => {
        for (let i = 0; i < 5; i++) {
          this.moviesList.push(...response[i].results);
        } // end for
      }) // end cb & map
    ); // end pipe
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
   * @param cb
   * @see   setMoviesList()
   */
  quizLogic(cb) {
    this.setMoviesList().subscribe(cb);
  }

  /**
   * Extracts the quiz' movie titles
   *
   * @see  getMoviePositionInList()
   */
  setMoviesTitles() {
    const titlePosition = 'title';
    for (let i = 0; i < 5; i++) {
      this.moviesTitles.push([]);
      for (let j = 0; j < 3; j++) {
        this.moviesTitles[i].push(this.moviesList
          [this.getMoviePositionInList(i, j)]
          // [titlePosition]
        ); // end push
        // console.log('Titles picked: ', i, j);
      } // end for (j)
    } // end for (i)
    console.log('TRY picked: ', this.moviesList
    [this.getMoviePositionInList(0, 1)]);


  } // end method


  /**
   * Creates a quiz
   */
  createQuiz() {
    // Picks 15 numbers out of 100
    this.moviePickerService.pickMoviesMatrix();

    // Picks 5 numbers out of the 15 picks
    this.moviePickerService.moviesToGuess(this
      .moviePickerService
      .moviesPicks);

    // Requesting and handling data for the quiz from Movie DB REST API
    this.quizLogic(() => {
      this.setMoviesTitles();
      console.log('PICKS: ', this.moviePickerService.moviesPicks);

      console.log('TITLES: ', this.moviesTitles);
      // console.log('ZKOUŠKA xx: ', this.moviesList[2].title);
    });
  }

  ngOnInit() {
    // Cerate a quiz on a page load
    this.createQuiz();
  }
}
