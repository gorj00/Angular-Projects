import { Component, OnInit, Input } from '@angular/core';
import { MovieContentService } from 'src/app/services/movie-content.service';
import { Config } from 'protractor';
import { map } from 'rxjs/operators';

// Iterfaces import
import { IMovieObject } from '../../../interfaces/movie-object.interface';
import { IMovieClues } from '../../../interfaces/movie-clues.interface';

@Component({
  selector: 'app-clues',
  templateUrl: './clues.component.html',
  styleUrls: ['./clues.component.css']
})
export class CluesComponent implements OnInit {
  @Input() movieOrder: number;
  @Input() movieID: number;
  @Input() moviesTotal: number;
           cluesImgs: string[] = [];
           moviesYears: number[] = [];
           moviesClues: {
             year: number[],
             director: string[],
             cast: string,
             images: string[]
           }[] = [];

  constructor(private movieContentService: MovieContentService) { }

  setImages() {
    return this.movieContentService
    .getMoviesObjectsObservables(this.movieID)
      .pipe(
        map(
          (response: IMovieObject) => {
            // Storing the first four movie image objects into an array
            const imgObjects = response
                                .images
                                .backdrops
                                .slice(0, 4);

            // Extracting the images URLs and storing them in an instance array
            imgObjects.map(image =>
              this.cluesImgs.push(
                'http://image.tmdb.org/t/p/w185' + image.file_path
              )
            );

            // Store movie movie movie years
            this.moviesYears.push(
              +response.release_date.substring(0, 4)
            );
          } // end response
        ) // end map
      ); // end pipe
  }

  setDirector(res: IMovieClues, arr: string[]) {
    res.crew.forEach(entry => {
      if (entry.job === 'Director') {
        arr.push(entry.name);
      }
    });
  }

  setCast(res: IMovieClues, arr: IMovieClues['cast'][]) {
    arr.push(res.cast.slice(0, 4));
  }

  setMoviesClues() {
    return this.movieContentService
    .getMoviesCluesObservables(this.movieID)
      .pipe(
        map(
          (response: IMovieClues) => {
            const year: number[] = this.moviesYears;
            const director: string[] = [];
            const cast: IMovieClues['cast'][] = [];
            const images: string[] = this.cluesImgs;
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
    // Gather clues on a load
    this.gatherClues();
  }
}
