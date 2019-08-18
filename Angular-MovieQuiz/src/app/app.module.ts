import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { CluesComponent } from './quiz/movie/clues/clues.component';
import { OptionsComponent } from './quiz/movie/options/options.component';
import { ResultsComponent } from './quiz/results/results.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StartComponent } from './quiz/start/start.component';
import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent } from './effects/loading/loading.component';
import { ProgressBottomComponent } from './effects/progress-bottom/progress-bottom.component';
import { MovieContentService } from './services/movie-content.service';

// Angular Material Imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MovieComponent } from './quiz/movie/movie.component';

const appRoutes: Routes = [
  {
    path: '',
    component: StartComponent,
    outlet: 'main'
  },
  {
    path: 'quiz',
    component: QuizComponent,
    outlet: 'main'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    CluesComponent,
    OptionsComponent,
    ResultsComponent,
    StartComponent,
    LoadingComponent,
    ProgressBottomComponent,
    MovieComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MovieContentService],
  bootstrap: [AppComponent]
})
export class AppModule {}
