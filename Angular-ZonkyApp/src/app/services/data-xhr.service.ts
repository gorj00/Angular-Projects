import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Injectable()
export class DataXHRService {
  baseUrl = 'https://api.zonky.cz/';

  constructor(private http: HttpClient) {}

  getLoans() {
    return this.http.get(
      'https://api.zonky.cz/loans/marketplace',
      { observe: 'response' }
    );
  }
}
