import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { MainComponent } from './layout/main/main.component';
import { FooterComponent } from './layout/footer/footer.component';

// Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';

// ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { HomeComponent } from './content/home/home.component';
import { StoriesComponent } from './content/stories/stories.component';
import { AverageLoanComponent } from './content/average-loan/average-loan.component';
import { AppMethodologyComponent } from './content/app-methodology/app-methodology.component';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pribehy', component: StoriesComponent },
  {
    path: 'prumerna-vyse-pujcek',
    component: AverageLoanComponent
  },
  {
    path: 'metodika-aplikace',
    component: AppMethodologyComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    NavigationComponent,
    HomeComponent,
    StoriesComponent,
    AverageLoanComponent,
    AppMethodologyComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
