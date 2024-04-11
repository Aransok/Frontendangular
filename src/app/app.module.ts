import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { appInterceptorProvider } from './app.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MovieBigPageComponent } from './movies/movie-big-page/movie-big-page.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import { DeleteMovieComponent } from './movies/delete-movie/delete-movie.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';

@NgModule({
  declarations: [AppComponent, MovieBigPageComponent, EditMovieComponent, DeleteMovieComponent, AddMovieComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false,
    }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
