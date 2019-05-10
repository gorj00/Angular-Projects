import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  /**
   * Number of movies that is supposed to be displayed
   */
  numsOfMovies = 5;

  constructor() { }

  /**
   * Method returns an array of numbers starting from 1 to param(num)
   * for ngFor that renders the wanted number of movies for the quiz
   *
   * @param   num number of movies that will be displayed
   * @returns     numbers array
   * @example     [1, 2, 3] for param(num) = 3
   */
  numToArray(num: number): number[] {
    /* Creates array filled with the number, then takes their key
       and creates an array out of them, then increments them by 1 */
    return [...Array(num).keys()].map(item => item + 1);
  }

  ngOnInit() {
  }

}
