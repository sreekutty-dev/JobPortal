import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // For now, we'll check if the username is 'admin'
    // In a real application, you'd check user roles from the backend
    const username = localStorage.getItem('username');
    if (username === 'admin') {
      return true;
    } else {
      this.router.navigate(['/candidate/dashboard']);
      return false;
    }
  }
} 