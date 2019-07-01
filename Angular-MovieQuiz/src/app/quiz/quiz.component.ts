import { Component, OnInit } from '@angular/core';
import { MoviePickerService } from 'src/app/services/movie-picker.service';
import { MovieContentService } from 'src/app/services/movie-content.service';
import { Config } from 'protractor';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [MoviePickerService, MovieContentService]
})
export class QuizComponent implements OnInit {
  /**
   * Number of movies that is supposed to be displayed
   */
  numsOfMovies = 5;

  /**
   * This list contains 100 recent movies
   */
  moviesList: string[] = [];

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

  /**
   * Stores 100 movies into the instance attribute
   *
   * @see  moviesList
   */
  getAllMovies() {
    this.movieContentService.getMoviesList()
    .subscribe(
      (response) => {
        for (let i = 0; i < 5; i++) {
          this.moviesList.push(...response[i].results);
        }
        console.log('List inner: ', this.moviesList);
        },
      error => console.log(error)
    ); // end subscribe
  } // end getAllMovies()

  // TODO
  getMovieTitle() {

  }

  ngOnInit() {
    // On every load, make a new quiz
    this.moviePickerService.pickMoviesMatrix();
    this.moviePickerService
    .moviesToGuess(this.moviePickerService.moviesPicks);
    this.getAllMovies();
    console.log('INSTANCE: ', this.moviesList);

  }

}
