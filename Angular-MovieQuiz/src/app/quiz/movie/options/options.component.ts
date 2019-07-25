import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  @Input() optionsTitlesAndIds: {};
  @Input() movieToGuessId;
  @Output() progressIncr = new EventEmitter<any>();
  @Output() correctIncr = new EventEmitter<any>();
           optionsDisabled = false;
           optionCorrect: boolean;

  constructor() { }

  onChoose(option: HTMLInputElement) {
    this.progressIncr.emit();
    this.optionsDisabled = true;
    // +string => number
    if (this.movieToGuessId === +option.id) {
      this.optionCorrect = true;
      this.correctIncr.emit();
    } else {
      this.optionCorrect = false;
    }
  }

  ngOnInit() {
  }

}
