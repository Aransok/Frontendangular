import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../../types/Movie';
import { User } from 'src/app/types/User';
import { UserServiceService } from 'src/app/user-service.service';
import { MOVIES } from 'src/app/shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movie-big-page',
  templateUrl: './movie-big-page.component.html',
  styleUrls: ['./movie-big-page.component.css'],
})
export class MovieBigPageComponent implements OnInit {
  movie: Movie | null = null;
  user!: User;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private userService: UserServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {
    userService.userObs.subscribe((newUser) => {
      this.user = newUser;
    });
  }

  ngOnInit(): void {
    this.getMovieDetails();
  }

  getMovieDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Retrieved ID:', id);
    if (id === 'add') this.router.navigate(['movies/add']);
    if (id && id != 'add') {
      this.http.get<Movie>(`http://localhost:5000/api/movies/${id}`).subscribe({
        next: (value: Movie) => {
          this.movie = value;
        },
        error: (error) => {
          console.error('Error fetching movie:', error);
        },
      });
    }
  }
  editMovie(): void {
    if (this.movie && this.movie._id) {
      this.router.navigate([`movies/${this.movie._id}/edit`]);
    }
  }
  deleteMovie(movieId: string) {
    this.http.delete(MOVIES + movieId + '/delete').subscribe(
      () => {
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error deleting movie:', error);
      }
    );
  }
}
