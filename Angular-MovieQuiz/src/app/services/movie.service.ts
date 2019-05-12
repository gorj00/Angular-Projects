import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MovieService {
  baseUrl = 'https://api.themoviedb.org/3/';
  apiKey = '?api_key=a5357212f9c747dac679fc5ab1aa7ca9';

  constructor(private http: HttpClient) {}

  getMovProperties(value: number) {
      return this.http.get(this.baseUrl + 'movie/' + value + this.apiKey +
        '&language=en-US' +
        '&append_to_response=images' +
        '&include_image_language=en,' +
        'null');
  }
}
