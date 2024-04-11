import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/types/User';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent {
  user!: User;
  constructor(private userService: UserServiceService, private router: Router) {}

  ngOnInit(): void {
    this.userService.userObs.subscribe((user) => {
      this.user = user;
    });
  }

  changePassword() {
    const currentPassword = prompt('Enter your current password:');
    console.log(this.user.userID);
    if (currentPassword) {
      const newPassword = prompt('Enter your new password:');
      if (newPassword) {
        this.userService
          .changePassword(this.user.userID, currentPassword, newPassword)
          .subscribe(() => {
            
          });
      }
    }
  }

  deleteAccount() {
    const confirmDelete = confirm(
      'Are you sure you want to delete your account?'
    );
    if (confirmDelete) {
      this.userService.deleteAccount(this.user.userID).subscribe(() => {
        this.userService.logout()
        this.router.navigate(['/']);
      });
    }
  }
}
