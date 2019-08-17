import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bottom',
  templateUrl: './progress-bottom.component.html',
  styleUrls: ['./progress-bottom.component.css']
})
export class ProgressBottomComponent implements OnInit {

  @Input() progressValue: number;

  constructor() { }

  ngOnInit() {
  }

}
