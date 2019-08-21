import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { MovieContentService } from '../../../services/movie-content.service';

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
  @Input()  movieOrder: number;
  @Output() progressIncrement = new EventEmitter<void>();
  @Output() correctIncrement  = new EventEmitter<void>();
            optionsDisabled: boolean;
            moviesTotal: number = this.movieContentService
                                      .moviesTotal;
            questionParam: string = this.activatedRoute
                                 .snapshot
                                 .queryParamMap
                                 .get('question');

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private movieContentService: MovieContentService) { }

  onChoose(option: HTMLInputElement,
           chosen: HTMLLabelElement,
           order: number) {
    this.progressIncrement.emit();
    this.optionsDisabled = true;
    if (this.movieToGuessId === +option.id) {
      this.correctIncrement.emit();
      chosen.className = 'correct-answer';
    } else {
      chosen.className = 'incorrect-answer';
    }
    this.handleRoute();
  }

  handleRoute() {
    if (+this.questionParam < this.moviesTotal) {
      this.router.navigate(['/quiz'], {
        queryParams: {
          question: this.movieOrder + 1
        }
      });
      console.log(this.optionsDisabled);
    } else {
      this.router.navigate(['/results']);
      console.log(this.optionsDisabled);
    }
  }

  ngOnInit() {
  }

}
