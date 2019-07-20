import { Component, OnInit, Input } from '@angular/core';
import { MovieContentService } from 'src/app/services/movie-content.service';
import { Config } from 'protractor';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-clues',
  templateUrl: './clues.component.html',
  styleUrls: ['./clues.component.css']
})
export class CluesComponent implements OnInit {
  @Input() movieOrder: number;
  @Input() movieID: number;
           cluesImgs: string[] = [];
           moviesClues: any[] = [];
           moviesYears: number[] = [];

  constructor(private movieContentService: MovieContentService) { }

  /**
   * Gets the movie's 4 image URLs
   *
   * Movie object image URLs location:
   * Fetched Data → images → backdrops → file_path
   */
  setImages() {
    return this.movieContentService
    .getMoviesObjectsObservables(this.movieID)
      .pipe(
        map(
          (response: Config) => {
            // Storing the first four movie image objects into an array
            const imgObjects = response
            .images
            .backdrops
            .slice(0, 4);

            // Extracting the images URLs and storing them in an instance array
            imgObjects.map(image => this.cluesImgs
              .push('http://image.tmdb.org/t/p/w185' + image.file_path)
              );

            // Store movie movie movie years
            this.moviesYears.push(response
              .release_date
              .substring(0, 4)
              );
          } // end response
        ) // end map
      ); // end pipe
  }

  /**
   * Setting Director property
   *
   * @param res Server response
   * @param obj Movie crew object
   */
  setDirector(res: Config, obj: any) {
    res.crew.forEach(entry => {
      if (entry.job === 'Director') {
        obj.push(entry.name);
      }
    });
  }

  /**
   * Setting Cast property
   *
   * @param res Server response
   * @param arr Cast array
   */
  setCast(res: Config, arr: any) {
    arr.push(res.cast.slice(0, 4));
  }

  /**
   * Setting entire movie clue object
   */
  setMoviesClues() {
    return this.movieContentService
    .getMoviesCluesObservables(this.movieID)
      .pipe(
        map(
          (response: Config) => {
            const year = this.moviesYears;
            const director = [];
            const cast = [];
            const images = this.cluesImgs;
            let castString: string;

            this.setDirector(response, director);
            this.setCast(response, cast);

            // Transform cast names into one string separated by a comma
            castString = cast[0].map(castObject => castObject.name).join(', ');

            // Setting the entire movie clues object
            this.moviesClues.push({
              year,
              director,
              cast: castString,
              images
            }); // end object in push
          } // end response
        ) // end map
      ); // end pipe
  }

  /**
   * Setting images and years to component property
   *
   * @param cb Callback function
   */
  imagesAndYearLogic(cb) {
    this.setImages().subscribe(cb);
  }

  /**
   * Setting movie clues to component property
   *
   * @param cb  Setting m
   */
  moviesCluesLogic(cb) {
    this.setMoviesClues().subscribe(cb);
  }

  /**
   * Gathers all of the clues and sets a movie clues object
   * into a component property
   */
  gatherClues() {
    // Storing images and years
    this.imagesAndYearLogic(() => {
      this.setImages();
    });

    // Setting entire movies clues object
    this.moviesCluesLogic(() => {
      this.setMoviesClues();
    });
  }

  ngOnInit() {
    // Gather clues on a load
    this.gatherClues();
  }
}
