import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MovieContentService {
  baseUrl = 'https://api.themoviedb.org/3/';
  apiKey = '?api_key=a5357212f9c747dac679fc5ab1aa7ca9';

  constructor(private http: HttpClient) {}

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
