# Angular Projects

## ## Quick Overview
- **#1 Ng Blog**: **[[ live demo ](https://gorj00.github.io/demos/blog/)]**   ·   **[[ Angular code ](https://github.com/gorj00/Angular-Blog)]**,
- **#2 Customer filter template**: **[[ live demo ](https://gorj00.github.io/demos/customer-filter/)]**   ·   **[[ Angular code ](https://github.com/gorj00/Angular-Customer-Filter)]**,
- **#3 USD Converter**: **[[ live demo ](https://gorj00.github.io/demos/usd-converter/)]**   ·   **[[ Angular code ](https://github.com/gorj00/Angular-USDconverter)]**,
- **#4 Movie Quiz**: **[[ live demo ](https://gorj00.github.io/demos/movie-quiz/)]**   ·   **[[ Angular code ](./Angular-MovieQuiz)]**,

See more information about each project below.
<hr />

## #1 Ng Blog
**[[ LIVE DEMO ](https://gorj00.github.io/demos/blog/)]**   ·   **[[ ANGULAR CODE ](https://github.com/gorj00/Angular-Blog)]**

- **keywords:** 
  - <strong>UI</strong>: Angular Material
  - <strong>Approach</strong>: declarative (reactive RxJS)
  - <strong>Forms</strong>: reactive
  - <strong>Architecture</strong>: lazy loading, containers and presentational components, redux pattern
  - <strong>Redux libs</strong>: @ngrx/store, @ngrx/data, @ngrx/router, @ngrx/entity
    - entity blogPost demonstrated with @ngrx/data
    - entity tag demonstrated with @ngrx/store
  
- **temporary issues:** 
   - <small><span style="color: red;">as of now, relies on external API that does not allow blogPosts updates in edit mode; therefore, will be replaced with .NET Core backend in the near future</span></small>
   - <small><span style="color: red;">the external API does not allow filtering blogs by tags</span></small>
   - <small><span style="color: red;">due to the above, the site may not temporarily work while using the external API solution</span></small>

## #2 Customer Filter Template
**[[ LIVE DEMO ](https://gorj00.github.io/demos/customer-filter/)]**   ·   **[[ ANGULAR CODE ](https://github.com/gorj00/Angular-Customer-Filter)]**

- **keywords:** 
  - composing of customer-related stats filters, the result is sorted and logged into the console,
  - Reactive forms – FormBuilder, FormGroup, FormControl, FormArray,
  - NgPrime UI library

## #3 USD Converter (ENG and CZE) 
**[[ LIVE DEMO ](https://gorj00.github.io/demos/usd-converter/)]**   ·   **[[ ANGULAR CODE ](https://github.com/gorj00/Angular-USDconverter)]**

- **keywords:** 
  - Dependency injection
  - RxJS
  - Forms — Template driven approach
  - HttpClient
  - Angular Material 
  - Exchange rates API
  - ngx-translate — switching between English and Czech

## #3 Movie Quiz
**[[ LIVE DEMO ](https://gorj00.github.io/demos/movie-quiz/)]**   ·   **[[ ANGULAR CODE ](./Angular-MovieQuiz)]**

- **keywords:** 
  - external API ([The Movie DB](https://www.themoviedb.org/))
  - HttpClient
  - Observables, Reactive Programming (RxJS)
  - Dependency Injection
  - Components parent/child communication (Input, Output)
  - Angular Material
