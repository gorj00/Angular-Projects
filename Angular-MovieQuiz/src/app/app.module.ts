import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { CluesComponent } from './quiz/movie/clues/clues.component';
import { OptionsComponent } from './quiz/movie/options/options.component';
import { ResultsComponent } from './quiz/results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    CluesComponent,
    OptionsComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
