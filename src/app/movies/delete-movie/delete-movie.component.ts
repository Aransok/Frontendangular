import { Component } from '@angular/core';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'app-delete-movie',
  templateUrl: './delete-movie.component.html',
  styleUrls: ['./delete-movie.component.css']
})
export class DeleteMovieComponent {
  movieIdToDelete: string = '';

  constructor(private movieService: MovieService) { }

  onDeleteMovie(): void {
    this.movieService.deleteMovie(this.movieIdToDelete).subscribe(
      () => {
        console.log('Movie deleted successfully!');
        
      },
      error => {
        console.error('Failed to delete movie:', error);
        
      }
    );
  }
}
