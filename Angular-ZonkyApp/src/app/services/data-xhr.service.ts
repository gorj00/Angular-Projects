import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Injectable()
export class DataXHRService {
  baseUrl = 'https://api.zonky.cz/';

  constructor(private http: HttpClient) {}

  getLoans() {
    return this.http.get(
      'https://private-anon-2aa5be6b64-zonky.apiary-proxy.com/loans/marketplace',
      { observe: 'response' }
    );
  }
}
