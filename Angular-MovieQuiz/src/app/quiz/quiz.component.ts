import { Component, OnInit } from '@angular/core';
import { MovieContentService } from 'src/app/services/movie-content.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [MovieContentService]
})
export class QuizComponent implements OnInit {

  loadingStatus = true;
  progressValue: number;
  moviesTotal: number = this.movieContentService
                            .moviesTotal;

  constructor(private movieContentService: MovieContentService) {}

  progressIncrease(progress: number) {
    this.progressValue = progress;
  }

  ngOnInit() {
  }
}
