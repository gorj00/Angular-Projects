import { Component, OnInit, Input } from '@angular/core';
import { MovieContentService } from 'src/app/services/movie-content.service';
import { Config } from 'protractor';

@Component({
  selector: 'app-clues',
  templateUrl: './clues.component.html',
  styleUrls: ['./clues.component.css']
})
export class CluesComponent implements OnInit {
  @Input() singleMovNum: number;
  cluesImgs: string[] = [];

  constructor(private movieContentService: MovieContentService) { }

  /**
   * Gets the movie's 4 image URLs
   *
   * Movie object image URLs location:
   * Fetched Data → images → backdrops → file_path
   */
  // trying out Avengers Endgame ID 299534
  getImages() {
    this.movieContentService.getMovObjects(299534)
      .subscribe(
        (response: Config) => {
          // Storing the first four movie image objects into an array
          const imgObjects = response.images.backdrops.slice(0, 4);

          // Extracting the images URLs and storing them in an instance array
          imgObjects.map(image => this.cluesImgs
            .push('http://image.tmdb.org/t/p/w185' + image.file_path)
            );

          console.log(this.cluesImgs);
        },
        error => console.log(error)
    );
  }



  getHints() {

  }

  ngOnInit() {
    // trying out Avengers Endgame ID 299534
    this.getImages();
  }

}
