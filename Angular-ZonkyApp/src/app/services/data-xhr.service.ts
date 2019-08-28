import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Injectable()
export class DataXHRService {
  constructor(private http: HttpClient) {}

  getLoans() {
    return this.http.get('https://crossorigin.me/https://private-anon-3f152b1f8e-zonky.apiary-proxy.com/loans/marketplace');
  }
}
