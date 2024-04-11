import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './types/User';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserLogin } from './types/IUserLoogin';
import {
  USER_CHANGE_PASSWORD,
  USER_DELETE_ACCOUNT,
  USER_LOGIN_URL,
  USER_REGISTER,
} from './shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from './types/IUserRegister';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userObs: Observable<User>;
  /**
   *
   */
  constructor(private http: HttpClient, private toastrService: ToastrService,private router: Router) {
    this.userObs = this.userSubject.asObservable();
  }
  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to MyMovies ${user.email}`,
            `Login successful${user.userID}` 
          );
          console.log({ user :user.userID });
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        },
      })
    );
  }
  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to MyMovies ${user.email}`,
            'Registration successful'
          );
          // Log in the user after successful registration
          this.login(user);
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Registration Failed');
        },
      })
    );
  }
  
  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }
  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
  changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Observable<User> {
    return this.http
      .put<User>(USER_CHANGE_PASSWORD, {
        userId,
        currentPassword,
        newPassword,
      })
      .pipe(
        tap({
          next: (user) => {
            
            user.userID = userId;
            this.setUserToLocalStorage(user);
            this.userSubject.next(user);
            this.toastrService.success('Password changed successfully');
          },
          error: (errorResponse) => {
            try {
              
              const errorMessage = JSON.parse(errorResponse.error).error;
              this.toastrService.error(errorMessage, 'Failed to change password');
            } catch (parseError) {
             
              this.toastrService.success('Password changed successfully');
            }
          },
        })
      );
  }
  
  

  deleteAccount(userId: string): Observable<void> {
    const url = `${USER_DELETE_ACCOUNT}/${userId}`; 
    return this.http.delete<void>(url).pipe(
      tap(() => {
        this.userSubject.next(new User());
        localStorage.removeItem(USER_KEY);
        this.toastrService.success('Account deleted successfully');
        this.router.navigate(["/"])
      }),
      catchError((errorResponse) => {
        try {
          
          const errorMessage = JSON.parse(errorResponse.error).error;
          this.toastrService.error(errorMessage, 'Failed to delete account');
          this.router.navigate(["/"])
        } catch (parseError) {
          
          this.logout();
          this.router.navigate(["/"])
          
        }
        throw errorResponse;
        
      })
    );
  }
  
}
