// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
// RxJS
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';

@Injectable()
export class TokenInterceptService implements HttpInterceptor {

  urlsToNotUse: Array<string>;

  constructor(private service: AuthService) {
    this.urlsToNotUse = [
      'authenticate',
      'registro',
    ];
  }

  // intercept request and add token
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.isValidRequestForInterceptor(request.url)) {
      const modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.service.getToken().token}`
        }
      });

      return next.handle(modifiedRequest);
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 403) {
          this.service.logout();
        }

        return throwError(err);

      })
    );
  }

  private isValidRequestForInterceptor(requestUrl: string): boolean {

    const positionIndicator = 'Usuario/';
    const position = requestUrl.indexOf(positionIndicator);

    if (position > 0) {
      const destination: string = requestUrl.substr(position + positionIndicator.length);
      for (const address of this.urlsToNotUse) {
        if (new RegExp(address).test(destination)) {
          return false;
        }
      }
    }
    return true;
  }
}
