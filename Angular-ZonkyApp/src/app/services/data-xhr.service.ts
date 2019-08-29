import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DataXHRService {
  // Zonky REST API
  baseUrl = 'https://api.zonky.cz/';

  // Total counts
  loansTotal: number;

  constructor(private http: HttpClient) {
    this.getAllLoansCount(this.loansTotal).subscribe();
    console.log(this.loansTotal);
  }

  getLoansPage(pageOrder: number): Observable<any> {
    return this.http.get('https://api.zonky.cz/loans/marketplace', {
      headers: { 'X-Page': pageOrder.toString() },
      observe: 'response'
    });
  }

  paginateRequest(
    totalCount: number,
    pageSize: number,
    observablePagefunction: (pageOrder: number) => Observable<any>
  ) {
    const observablesJoin: Observable<any>[] = [];

    for (let i = 1; i <= totalCount; i += pageSize) {
      observablesJoin.push(observablePagefunction(i));
    }

    return forkJoin([...observablesJoin]);
  }

  getAllLoansCount(variable: number | null) {
    return this.getLoansPage(1).pipe(
      map(
        response => {
          variable = response.headers.get('X-Total');
        },
        error => console.log(error)
      ) // end map
    ); // end pipe
  }

  // allCountsLogic(cb) {
  //   this.getAllLoansCount(this.loansTotal).subscribe(cb);

  // }

  // observableLogic(
  //   observableFucntion: ( ...args: any[]) => Observable<any>,
  //   cb
  //   ) {
  //   observableFucntion().subscribe(cb);
  // }
}
