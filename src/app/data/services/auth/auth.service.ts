import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '@data/schemas/auth/auth.interface';
import { Router } from '@angular/router';
import { environment } from '@env/environment';

@Injectable()
export class AuthService {

  public URL = environment.api;

  constructor(private http: HttpClient, private router: Router) {
  }

  // Authentication/Authorization
  login(user: Login) {
    return this.http.post(`${this.URL}login`, user);
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }

  getToken() {
      return localStorage.getItem('token');
  }

}
