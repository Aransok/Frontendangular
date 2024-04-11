import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Movie } from './types/Movie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MOVIES, MOVIES_SEARCH } from './shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  public readonly API_URL = 'http://localhost:5000/api/movies';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(MOVIES);
  }
  getMoviesBySearchTerm(searchTerm: string) {
    return this.http.get<Movie[]>(MOVIES_SEARCH + searchTerm);
  }
  getMovieById(id: string): Observable<Movie> {
    return this.http.get<any>(MOVIES + id);
  }
  editMovie(id: string, movie: Movie): Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.http.put(url, movie);
  }
  deleteMovie(movieId: string): Observable<any> {
    const url = `${this.API_URL}/${movieId}`;
    return this.http.delete(url);
  }
  addMovie(movieData: FormData): Observable<any> {
    console.log(movieData);

    return this.http.post<any>(`${this.API_URL}/add`, movieData).pipe(tap({
      next: () => {
        console.log('Movie Added Successfully!');
      
      }
    }));
  }
}
