import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'jobportal-frontend';
  isLoggedIn = false;
  isAdmin = false;
  username = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.checkAuthStatus();
  }

  checkAuthStatus() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = localStorage.getItem('username') || '';
    this.isAdmin = this.username === 'admin';
  }

  logout() {
    this.authService.logout();
    this.checkAuthStatus();
  }
}
