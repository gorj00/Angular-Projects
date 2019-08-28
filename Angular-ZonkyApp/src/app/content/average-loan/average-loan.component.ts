import { Component, OnInit } from '@angular/core';
import { DataXHRService } from '../../services/data-xhr.service';

@Component({
  selector: 'app-average-loan',
  templateUrl: './average-loan.component.html',
  styleUrls: ['./average-loan.component.css'],
  providers: [DataXHRService]
})
export class AverageLoanComponent implements OnInit {

  constructor(private dataXHRService: DataXHRService) { }

  ngOnInit() {
    this.dataXHRService.getLoans().subscribe(
      response => console.log(response),
      error => console.log(error),
      () => console.log('Completed!')
    );
  }

}
