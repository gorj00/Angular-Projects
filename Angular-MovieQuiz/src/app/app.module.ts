import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { CluesComponent } from './quiz/movie/clues/clues.component';
import { OptionsComponent } from './quiz/movie/options/options.component';
import { ResultsComponent } from './quiz/results/results.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { StartComponent } from './quiz/start/start.component';
import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent } from './effects/loading/loading.component';

const appRoutes: Routes = [
  { path: '', component: StartComponent },
  { path: 'quiz', component: QuizComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    CluesComponent,
    OptionsComponent,
    ResultsComponent,
    StartComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
