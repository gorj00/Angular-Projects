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
  // @Input() moviesSubObjects;
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
    return this.movieContentService.getMoviesObjectsObservables(this.movieID)
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
          // console.log('Year O: ', this.moviesYears);
          // console.log('Images O: ', this.cluesImgs);

        }
      ));
  }

  // Setting Director property
  setDirector(res: Config, obj: any) {
    res.crew.forEach(entry => {
      if (entry.job === 'Director') {
        obj.push(entry.name);
      }
    });
  }

  setCast(res: Config, arr: any) {

  }

  setMoviesClues() {
    return this.movieContentService.getMoviesCluesObservables(this.movieID)
      .pipe(
        map(
        (response: Config) => {
          const year = this.moviesYears;
          const director = [];
          const cast = [];
          const images = this.cluesImgs;

          this.setDirector(response, director);

          // Setting cast property
          cast.push(response.cast.slice(0, 4));
          const castNames = cast[0].map(castObject => castObject.name).join(', ');

          // Setting the entire movie clues object
          this.moviesClues.push({
            year,
            director,
            cast: castNames,
            images
          }); // end object in push
        }     // end cb response
      ));    // end map & pipe
  }

  imagesAndYearLogic(cb) {
    this.setImages().subscribe(cb);
  }

  moviesCluesLogic(cb) {
    this.setMoviesClues().subscribe(cb);
  }

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
    this.gatherClues();
  }
}
