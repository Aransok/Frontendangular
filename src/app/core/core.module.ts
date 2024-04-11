import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailsPopupComponent } from './movies/movie-details-popup/movie-details-popup.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from '../partials/search/search.component';
import { NotFoundComponent } from '../partials/not-found/not-found.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AboutUsComponent,
    ContactUsComponent,
    HomeComponent,
    MovieDetailsPopupComponent,
    SearchComponent,
    NotFoundComponent,
    EditProfileComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [LoginComponent, RegisterComponent, AboutUsComponent],
})
export class CoreModule {}
