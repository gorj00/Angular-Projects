import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  @Input()  movieToGuessId: number;
  @Output() progressIncrement = new EventEmitter<void>();
  @Output() correctIncrement  = new EventEmitter<void>();
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
