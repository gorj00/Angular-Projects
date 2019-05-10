import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clues',
  templateUrl: './clues.component.html',
  styleUrls: ['./clues.component.css']
})
export class CluesComponent implements OnInit {
  @Input() singleMovNum: number;

  constructor() { }

  ngOnInit() {
  }

}
