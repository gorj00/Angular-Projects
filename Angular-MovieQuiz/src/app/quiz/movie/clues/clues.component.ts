import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-clues',
  templateUrl: './clues.component.html',
  styleUrls: ['./clues.component.css'],
  providers: [MovieService]
})
export class CluesComponent implements OnInit {
  @Input() singleMovNum: number;
  cluesImgs: string[] = [];

  constructor(private movieService: MovieService) { }

  /**
   * Gets the movie's 4 image URLs
   */
  // trying out Avengers Endgame ID 299534
  getImages() {
    this.movieService.getMovImgUrls(299534).subscribe(
      (response: Response) => {

        // Image objects location: Fetched Data → images → backdrops
        const imgUrls: string[] = [];
        const nestedPath: string[] = ['images', 'backdrops', 'file_path'];

        const imgObjects = response[nestedPath[0]][nestedPath[1]].slice(0, 4);
        imgObjects.map(image => imgUrls.push('http://image.tmdb.org/t/p/w185'
          + image[nestedPath[2]]));
        this.cluesImgs = imgUrls;
        console.log(imgUrls);
      },
      error => console.log(error)
    );
  }

  ngOnInit() {
    // trying out Avengers Endgame ID 299534
    this.getImages();
  }

}
