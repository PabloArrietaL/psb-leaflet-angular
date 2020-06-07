import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const headers = {headers: new HttpHeaders({
      Authorization: this.getToken()
    })};
    this.http.get(`${this.URL}logout`, headers).subscribe(
      _ => {}
    );
    window.location.reload();
  }

  getToken() {
      return localStorage.getItem('token');
  }

}
