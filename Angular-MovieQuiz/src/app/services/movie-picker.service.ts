import { Injectable } from '@angular/core';

@Injectable()
export class MoviePickerService {
  moviesPicks: number[][] = [];
  moviesGuessed: number[] =[];

  constructor() {}

  /**
   * Method returns a random number in a given interval, this number will
   * represent the position of the movie in a movie list.
   *
   * It is due to the movie DB, since it can generate only 20 movies per one GET
   * request, this method will help generate three random movies from five sets
   * of movie lists (one movie list holds 20 unique movies)
   *
   * @returns   one random number in the given range
   */
  randomMovieNum(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Method picks five times 3 random movies from a unique set of 20 movies,
   * all together, 15 movies will be picked out of 100 options of most recently
   * successful movies
   *
   * Each of picks (out of 5 in total) contains 2 movies for a incorrect answer
   * and 1 movie as correct answer
   *
   * @example   this.moviesPicks = [
   *              [ 2, 15, 12]
   *              [24, 30, 36]
   *              [48, 51, 56]
   *              [72, 63, 69]
   *              [85, 99, 92]
   *            ]
   */
  pickMoviesMatrix(): void {
    /* Range of the sets of movie objects,
       the ranges will be incremented with a below loop's i by 20) */
    let min = 0;
    let max = 19;

    // Pick five times (five rows) ...
    for (let i = 0; i < 5; i++) {
      this.moviesPicks[i] = [];
      // (increment the range of the set by 20 unless it's the first iteration)
      if (i !== 0) {
        min += 20;
        max += 20;
      }
      // ... three unique movies (three items per row) ...
      while (this.moviesPicks[i].length < 3) {
        // ... from a unique set of twenty movies.
        const moviePicked = this.randomMovieNum(min, max);
        // If the random movie was already picked, start again ...
        if (this.moviesPicks[i].includes(moviePicked)) {
            continue;
          }
          // ... if it hasn't been picked yet, it can be stored in array.
        this.moviesPicks[i].push(moviePicked);
      } // while end
    } // for end
  }

  // TODO pick the correct movie out of the matrix's rows
  // pickMoviesGuessed(matrix: () => void): void {

  // }
}
