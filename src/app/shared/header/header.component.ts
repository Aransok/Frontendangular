import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/types/User';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  /**
   *
   */
  user!: User;
  constructor(private userService: UserServiceService) {
    userService.userObs.subscribe((newUser) => {
      this.user = newUser;
    });
  }
  ngOnInit(): void {}
  logout() {
    this.userService.logout();
  }
  
}
