import { Injectable } from '@angular/core';

@Injectable()
export class MoviePickerService {
  movies: number[][] = [];

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
   */
  pickMovies() {
    /* Range of the sets of movie objects, the sets will be (increment with i by 20):
        - 0 - 19,
        - 20 - 39,
        - 40 - 59,
        - 60 - 79,
        - 80 - 99 */
    let min = 0;
    let max = 19;

    // Pick five times ...
    for (let i = 0; i < 5; i++) {
      this.movies[i] = [];
      // (don't increment by 20 for the first iteration ( i = 0))
      if (i !== 0) {
        min += 20;
        max += 20;
      }
      // ... three unique movies ...
      while (this.movies[i].length < 3) {
        // ... from a unique set of twenty movies.
        const moviePicked = this.randomMovieNum(min, max);
        // If the random movie was already picked, start again ...
        if (this.movies[i].includes(moviePicked)) {
            continue;
          }
          // ... if it hasn't been picked yet, store it in array.
        this.movies[i].push(moviePicked);
      } // while end
    } // for end
  }

}
