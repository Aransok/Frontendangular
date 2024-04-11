import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/movie.service';
import { Movie } from 'src/app/types/Movie';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css'],
})
export class EditMovieComponent implements OnInit {
  movieId!: string;
  movie!: Movie;
  editedMovie!: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieId = id;
      this.loadMovie();
    } else {
      console.error('Movie ID is null.');
    }
  }

  loadMovie(): void {
    this.movieService.getMovieById(`/${this.movieId}`).subscribe(
      (movie) => {
        this.movie = movie;
        this.editedMovie = { ...movie };
      },
      (error) => {
        console.error('Failed to load movie details:', error);
      }
    );
  }

  onSubmit(): void {
    this.movieService
      .editMovie(`${this.movieId}/edit`, this.editedMovie)
      .subscribe(() => {
        console.log('Movie edited successfully!');
        this.router.navigate(['/movies/', this.movieId]);
      });
  }
}
