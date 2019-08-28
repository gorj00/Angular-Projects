import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Injectable()
export class DataXHRService {
  constructor(private http: HttpClient) {}

  getLoans() {
    return this.http.get('loans/marketplace');
  }
}
