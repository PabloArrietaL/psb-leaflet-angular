import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@data/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }

  canActivate(): boolean {
    if (!this.auth.getToken()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
