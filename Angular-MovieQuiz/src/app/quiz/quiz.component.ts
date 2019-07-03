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


  // /**
  //  * Extracts the quiz' movie TITLES
  //  *
  //  * @see  getMoviePositionInList()
  //  */
  // setMoviesTitles(): void {
  //   const titlePosition = 'title';
  //   for (let i = 0; i < 5; i++) {
  //     this.moviesTitles.push(i);
  //     for (let j = 0; j < 3; j++) {
  //       this.moviesTitles.push(this.moviesList
  //         [this.getMoviePositionInList(i, j)]
  //         // [titlePosition]
  //       ); // end push
  //     } // end for (j)
  //   } // end for (i)
  // } // end method


  /**
   * Stores 100 movies into the instance attribute
   *
   * @see  moviesList
   */
  getMoviesPages() {
  return this.movieContentService.getMoviesList()
    .pipe(map(response => {
        for (let i = 0; i < 5; i++) {
          this.moviesList.push(...response[i].results);
        }
      }
    ));
      // .catch((error) => {
      //    console.log('error ' + error);
      //    throw error;
      //  } // end catch
      // ); // end map
  } // end setMoviesList()

  /**
   * Creates a quiz
   */
  createQuiz(): void {

  }

  getMoviesList() {

  }

  ngOnInit() {
    this.moviePickerService.pickMoviesMatrix();
    this.moviePickerService.moviesToGuess(this
      .moviePickerService
      .moviesPicks);

    this.getMoviesPages().subscribe(() => {
      console.log('ZKOUŠKA xx: ', this.moviesList[2].title);
    });
    // this.getMoviesPages()
    //   .then(movies => {
    //     const list = [];
    //     for (let i = 0; i < 5; i++) {
    //       list.push(...movies[i].results);
    //     }
    //     this.moviesList = list.slice(0);
    //     console.log('ZKOUŠKA: ', this.moviesList[2]);
    //   });

    // console.log('PICKS: ', this.moviePickerService.moviesPicks);
    // console.log('TITLES: ', this.moviesTitles);
    // console.log('LIST', this.moviesList);


  }
}
