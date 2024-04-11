import { Component, OnInit } from '@angular/core';
//import { movies } from '../../data/database';
import { Movie } from '../../types/Movie';
import { MovieService } from 'src/app/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  selectedMovie: Movie | null = null;

  constructor(
    private movieService: MovieService,
    activatedRoute: ActivatedRoute
  ) {
    let moviesObservable: Observable<Movie[]>;
    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) {
        moviesObservable = this.movieService.getMoviesBySearchTerm(
          params['searchTerm']
        );
      } else {
        moviesObservable = this.movieService.getAll();
      }
      moviesObservable.subscribe((movieService) => {
        this.movies = movieService;
      });
    });
  }

  ngOnInit(): void {}
  openMovieDetails(movie: Movie): void {
    this.selectedMovie = movie;
  }

  closeMovieDetails(): void {
    this.selectedMovie = null;
  }
  
}
