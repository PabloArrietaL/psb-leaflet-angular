// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
// RxJS
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '@data/services/auth/auth.service';

@Injectable()
export class TokenInterceptService implements HttpInterceptor {

  constructor(private service: AuthService) {}

  // intercept request and add token
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401 || err.status === 403) {
          this.service.logout();
        }

        return throwError(err);

      })
    );
  }
}
