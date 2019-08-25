import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  success: number       = +this.activatedRoute
                               .snapshot
                               .queryParamMap
                               .get('correct');
  correctMovies: number = this.success / 20;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

}
