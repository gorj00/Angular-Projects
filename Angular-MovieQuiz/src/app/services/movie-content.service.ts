import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

// Interfaces import
import { IMoviesPage } from '../interfaces/movies-page.interface';
import { IMovieObject } from '../interfaces/movie-object.interface';
import { IMovieClues } from '../interfaces/movie-clues.interface';

@Injectable()
export class MovieContentService {
  baseUrl = 'https://api.themoviedb.org/3/';
  apiKeyPrefix = '?api_key=';
  apiKey = 'a5357212f9c747dac679fc5ab1aa7ca9';
  apiKeyPart: string = this.apiKeyPrefix + this.apiKey;

  constructor(private http: HttpClient) {}

  /**
   * Returns a page with 20 movies to pick three
   * for one question
   *
   * @param    page       (1-5)
   * @returns  Observable
   */
  getMoviesPerPage(page: number) {
    return this.http.get<IMoviesPage>(
      this.baseUrl +
        'discover/movie' +
        this.apiKeyPart +
        '&language=en-US' +
        '&sort_by=popularity.desc' +
        '&include_adult=false' +
        '&with_original_language=en' +
        '&page=' +
        page
    );
  }

  /**
   * Movie list consists of 5 pages
   *
   * @returns     Observables (forkJoin)
   */
  getMoviesObservables() {
    const moviePages: any[] = [];
    for (let i = 1; i <= 5; i++) {
      moviePages.push(this.getMoviesPerPage(i));
    }
    return forkJoin([...moviePages]);
  }

  /**
   * Extracts movie object with its images with the movie's ID
   *
   * @param   movieId   ID of the movie used to identify the movie object
   * @returns           JSON object movie with its properties
   */
  getMoviesObjectsObservables(movieId: number) {
    return this.http.get<IMovieObject>(
      this.baseUrl +
        'movie/' +
        movieId +
        this.apiKeyPart +
        '&language=en-US' +
        '&append_to_response=images' +
        '&include_image_language=en,' +
        'null'
    );
  }

  getMoviesCluesObservables(movieId: number) {
    return this.http.get<IMovieClues>(
      this.baseUrl +
        'movie/' +
        movieId +
        '/credits' +
        this.apiKeyPart
    );
  }
}
