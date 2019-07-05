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

  constructor(private movieContentService: MovieContentService) { }

  /**
   * Gets the movie's 4 image URLs
   *
   * Movie object image URLs location:
   * Fetched Data → images → backdrops → file_path
   */
  getImages() {
    this.movieContentService.getMoviesObjectsObservables(this.movieID)
      .subscribe(
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

          console.log('YAAY: ', this.movieID);
        },
        error => console.log(error)
    );
  }
  // setImages() {
  //   return this.movieContentService
  //   .getMoviesObjectsObservables(this.movieID)
  //     .pipe(
  //       map((response: Config) => {
  //         // Storing the first four movie image objects into an array
  //         const imgObjects = response
  //         .images
  //         .backdrops
  //         .slice(0, 4);

  //         // Extracting the images URLs and storing them in an component array
  //         imgObjects.map(image => this.cluesImgs
  //           .push('http://image.tmdb.org/t/p/w185' + image.file_path)
  //           );
  //       }) // end cb & map
  //   ); // end pipe
  // }


  // imagesLogic(cb) {
  //   this.setImages().subscribe(cb);
  // }

  ngOnInit() {
    // trying out Avengers Endgame ID 299534
    this.getImages();
    // this.imagesLogic(() => {
    //   this.setImages();
    //   console.log('YAAY: ', this.movieID);
    // });

    // console.log(this.singleMovNum);
  }

}
