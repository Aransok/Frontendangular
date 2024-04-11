import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/movie.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
})
export class AddMovieComponent {
  addMovieForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private movieService: MovieService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.addMovieForm = this.fb.group({
      Trailer: [''],
      Title: ['', Validators.required],
      Year: ['', Validators.required],
      Rated: [''],
      Released: ['', Validators.required],
      Runtime: ['', Validators.required],
      Genre: ['', Validators.required],
      Director: ['', Validators.required],
      Writer: ['', Validators.required],
      Actors: ['', Validators.required],
      Plot: ['', Validators.required],
      Poster: ['', Validators.required],
    });
  }

  get formControls() {
    return this.addMovieForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.addMovieForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.movieService.addMovie(this.addMovieForm.value).subscribe(
      () => {
        console.log('Movie added successfully');
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error adding movie:', error);
      }
    );
  }
}
