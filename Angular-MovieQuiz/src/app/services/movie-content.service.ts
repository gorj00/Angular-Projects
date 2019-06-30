import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable()
export class MovieContentService {
  baseUrl = 'https://api.themoviedb.org/3/';
  apiKey = '?api_key=a5357212f9c747dac679fc5ab1aa7ca9';

  constructor(private http: HttpClient) {}

  /**
   * Returns a page with 20 movies to pick three
   * for one question
   */
  getMoviesPage(page: number) {
    return this.http.get(this.baseUrl + 'discover/movie' +
      this.apiKey + '&language=en-US' +
      '&sort_by=popularity.desc' +
      '&include_adult=false' +
      '&with_original_language=en' +
      '&page=' + page);
  }

  /**
   * Consists of 5 pages
   */
  getMoviesList(): Observable<any> {
    const moviePages: any[] = [];
    for (let i = 1; i <= 5; i++) {
      moviePages.push(this.getMoviesPage(i));
    }
    return forkJoin([...moviePages]);
  }

  /**
   * Extracts movie object with its images with the movie's ID
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
