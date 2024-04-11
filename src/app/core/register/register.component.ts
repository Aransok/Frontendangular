import { UserServiceService } from 'src/app/user-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidartor } from 'src/app/shared/password_match_validator';
import { IUserRegister } from 'src/app/types/IUserRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: passwordMatchValidartor('password', 'confirmPassword') }
    );
  }

  get fc() {
    return this.registerForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      const fv = this.registerForm.value;
      const user: IUserRegister = {
        email: fv.email,
        password: fv.password,
        confirmPassword: fv.confirmPassword,
      };
      this.userService.register(user).subscribe((_) => {
        this.router.navigate(['/home']);
      });
    }
  }
}
