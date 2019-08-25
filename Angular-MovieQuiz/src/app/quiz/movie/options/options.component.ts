import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { MovieContentService } from '../../../services/movie-content.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
            optionsDisabled = false;
            // questionOrder: string;
            questionOrder: string = this.activatedRoute.snapshot.queryParamMap.get('question');
            moviesTotal: number = this.movieContentService
                                      .moviesTotal;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private movieContentService: MovieContentService) { }

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
    this.handleRoute();
  }

  handleRoute() {
    if (+this.questionOrder < this.moviesTotal) {
      const nextQuestionOrder: number = this.movieOrder + 1;
      // this.router.navigate([
      //   '/quiz',
      //   'question',
      //   nextQuestionOrder
      // ]);
      this.router.navigate(['/quiz'], {
        queryParams: {
          question: nextQuestionOrder
        }
      });
      console.log(this.optionsDisabled);
    } else {
      this.router.navigate(['/results']);
      console.log(this.optionsDisabled);
    }
  }

  ngOnInit() {
    // this.activatedRoute.params
    //  .subscribe(
    //      (params: Params) => {
    //         //  this.questionOrder = params.order;
    //         this.questionOrder = params['question'];

    //      }
    //  );
    console.log('Init: ', this.optionsDisabled);
  }

}
