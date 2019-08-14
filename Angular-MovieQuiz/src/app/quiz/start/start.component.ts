import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  siteTitle = 'Guess the Movie';
  siteSubtitle = 'QUIZZ';

  constructor() { }

  ngOnInit() {
  }

}
