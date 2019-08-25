# Angular Projects
## [#1 Movie Quiz (ENG)](./Angular-MovieQuiz) 
**[[LIVE DEMO](http://tviix.com/angular/movie-quiz/)]**   |   **[[ANGULAR CODE ](./Angular-MovieQuiz)]**
- conversion of plain [JS app (Movie Quiz)](../../../JavaScript-Projects) to 
Angular,
- I want this app to be more component based architecture for the purpose of 
implementing it as a feature later into a larger Angular Film Social Network 
app,
- **behavior:**
  - after starting quiz, the app loads 15 random movies (3 movies per a 
question - one movie to guess and two others as incorrect options) out of 100 
most recent movies from external REST API from Movie DB,
  - after guesser makes his guess, options are disabled and coloring of the 
chosen options follows - red (incorrect guess) or green (correct guess),
  - app tracks progress at the bottom
- **keywords:** 
  - external API ([The Movie DB](https://www.themoviedb.org/))
  - HttpClient
  - Observables, Reactive Programming (RxJS)
  - Dependency Injection
  - Components parent/child communication (Input, Output)
  - Angular Material

- **working on next version:**
  - stepper in between questions with a unique router (/quiz?question=1),
  - caching user's quiz choices when browsing back in the browser
  - progress bar made visible throughout entire quiz
  - main css (whole app) file spread into components css
  - animations added