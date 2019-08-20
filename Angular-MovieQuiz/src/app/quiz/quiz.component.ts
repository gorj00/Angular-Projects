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
  quizProgress = 0;
  moviesTotal: number = this.movieContentService
                            .moviesTotal;

  constructor(private movieContentService: MovieContentService) {}

  incrementQuizProgress() {
    this.quizProgress += 100 / this.moviesTotal;
  }

  ngOnInit() {
  }
}
