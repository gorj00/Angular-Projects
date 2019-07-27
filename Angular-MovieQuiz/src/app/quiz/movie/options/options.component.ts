import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  @Input()  optionsTitlesAndIds: {};
  @Input()  movieToGuessId;
  @Output() progressIncrement = new EventEmitter<any>();
  @Output() correctIncrement  = new EventEmitter<any>();
            optionsDisabled   = false;

  constructor() { }

  onChoose(option: HTMLInputElement,
           chosen: HTMLLabelElement) {
    this.progressIncrement.emit();
    this.optionsDisabled = true;
    if (this.movieToGuessId === +option.id) {
      this.correctIncrement.emit();
      chosen.className = 'correct-answer';
    } else {
      chosen.className = 'incorrect-answer';
    }
  }

  ngOnInit() {
  }

}
