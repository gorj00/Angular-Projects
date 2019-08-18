import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { Router} from '@angular/router';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  @Input()  optionsTitlesAndIds: {
              id: number,
              title: string
            }[];
  @Input()  movieToGuessId: number;
  @Output() progressIncrement = new EventEmitter<void>();
  @Output() correctIncrement  = new EventEmitter<void>();
            optionsDisabled   = false;

  constructor(private router: Router) { }

  onChoose(option: HTMLInputElement,
           chosen: HTMLLabelElement) {
    this.progressIncrement.emit();
    this.optionsDisabled = true;
    // this.router.navigate(['/quiz'], {
    //   queryParams: {
    //     question: 2
    //   }
    // });
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
