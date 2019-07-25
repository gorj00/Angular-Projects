import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  @Input() moviePicks;
  @Input() optionsTitlesAndIds: {};
  @Input() movieToGuess;
           optionsDisabled = false;
           optionCorrect: boolean;
           quizCorrect = 0;
           quizProgress = 0;

  constructor() { }

  onChoose(option: HTMLInputElement) {
    this.setQuizProgress(this.quizProgress);
    this.optionsDisabled = true;
    // +string => number
    if (this.movieToGuess === +option.id) {
      this.optionCorrect = true;
      this.setQuizCorrect(this.quizCorrect);
    } else {
      this.optionCorrect = false;
    }
    console.log(this.quizProgress);
    console.log(this.quizCorrect);
  }

  setQuizCorrect(count: number) {
    count = count + 20;
  }

  setQuizProgress(count: number) {
    count = count + 20;
  }

  ngOnInit() {
  }

}
