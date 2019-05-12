import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MovieService {
  movies: number[][] = [];
  baseUrl = 'https://api.themoviedb.org/3/';
  apiKey = '?api_key=a5357212f9c747dac679fc5ab1aa7ca9';

  constructor(private http: HttpClient) {}

  /**
   * Method returns a random number in a given interval, this number will
   * represent the position of the movie in a movie list.
   *
   * It is due to the movie DB, that can generate only 20 movies per one GET
   * request, this method will help generate three random movies from five sets
   * of movie lists (one movie lists holds 20 movies)
   *
   * @returns   one random number out of twenty numbers
   */
  randomMovieNum(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  pickMovies() {
    const min = 0;
    const max = 19;

    // Pick five times ...
    for (let i = 0; i < 5; i++) {
      const j = i + 1;
      this.movies[i] = [];
      // ... three unique movies
      while (this.movies[i].length < 3) {
        // ... from a unique set of twenty movies ...
        // TODO fix multiple by 0 with min problem
        const moviePicked = this.randomMovieNum(min * j, max * j);
        // If the random movie was already picked, start again ...
        if (this.movies[i].includes(moviePicked)) {
            continue;
          }
          // ... if it wasn't, store it in array
        this.movies[i].push(moviePicked);
      } // while
    } // for
    console.log(this.movies);
  }

  /**
   * Extracts movie object with its images with the movie ID
   *
   * @param   movieId   ID of the movie used to identify the movie object
   * @returns           JSON object movie with its properties
   */
  getMovObjects(movieId: number) {
      return this.http.get(this.baseUrl + 'movie/' + movieId + this.apiKey +
        '&language=en-US' +
        '&append_to_response=images' +
        '&include_image_language=en,' +
        'null');
  }
}
