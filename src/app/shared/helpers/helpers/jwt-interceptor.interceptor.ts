import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = sessionStorage.getItem('token');
    const userID = sessionStorage.getItem('userid');
    if (token && userID) {
      request = request.clone({
        setHeaders: {
          BEARER: token,
          'USER-ID': userID,
        },
      });
    }
    return next.handle(request);
  }
}
