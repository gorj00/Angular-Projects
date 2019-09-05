import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DataXHRService {
  // Zonky REST API
  baseUrl = 'https://api.zonky.cz/';

  // Total counts
  loansTotalCount: number[] = [];

  constructor(private http: HttpClient) {
    this.getAllLoansCount().subscribe();
    this.getAllLoansAmountTotal().subscribe(response => {
      let totalAmount = 0;
      let icr = 0;
      for (const loansPage of response) {
        icr++;
        for (const loan of loansPage.body) {
          // console.log(icr + ' : ' + loan.amount);
          totalAmount += loan.amount;
        }
      }
      console.log(totalAmount);
    });
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
    for (let i = 1; i <= totalCount / pageSize; i++) {
      observablesJoin.push(observablePagefunction(i));
    }
    return forkJoin([...observablesJoin]);
  }

  getTotalForLoop(totalCount: number, pageSize: number) {
    if (totalCount % pageSize === 0) {
      return totalCount / pageSize;
    } else {
      return totalCount / pageSize + 1;
    }
  }

  getAllLoansAmountTotal() {
    const observablesJoin: Observable<any>[] = [];

    for (let i = 1; i <= this.getTotalForLoop(30000, 20); i++) {
      // Delay 200s every 10 requests for browsers not to crush
      if (i % 10 === 0) {
        setTimeout(() => {
          observablesJoin.push(this.getLoansPage(i));
        }, 500);
      } else {
        observablesJoin.push(this.getLoansPage(i));
      } // end else
    } // end for

    return forkJoin([...observablesJoin]);
  }

  getAllLoansCount() {
    return this.getLoansPage(1).pipe(
      map(
        response => {
          const loansTotalCount = response.headers.get('X-Total');
          this.loansTotalCount.push(loansTotalCount);
        },
        error => console.log(error)
      ) // end map
    ); // end pipe
  }

  getTotalAmount() {
    return this.getLoansPage(1).pipe(
      map(
        response => {
          const loansTotalCount = response.headers.get('X-Total');
          this.loansTotalCount.push(loansTotalCount);
        },
        error => console.log(error)
      ) // end map
    ); // end pipe
  }
}
