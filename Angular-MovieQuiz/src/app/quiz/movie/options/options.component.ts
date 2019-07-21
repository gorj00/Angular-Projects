import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  @Input() moviePicks;
  optionsMovieTitles: {};

  constructor() { }

  ngOnInit() {
    // console.log(this.moviePicks);
    // QUIZ [moviePicks]="moviePicks"></app-options
  }

}
