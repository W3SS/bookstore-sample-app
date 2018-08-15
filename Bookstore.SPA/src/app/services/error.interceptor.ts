import {
    HttpInterceptor,
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HTTP_INTERCEPTORS
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs/Observable';

  @Injectable()
  export class ErrorInterceptor implements HttpInterceptor {
    
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).catch(response => {
        if (response instanceof HttpErrorResponse) {
          const applicationError = response.headers.get('Application-Error');
          if (applicationError) {
            return Observable.throw(applicationError);
          }

          const serverError = response.error;
          let modelStateErrors = '';
          if (serverError && typeof serverError === 'object') {
            for (const key in serverError) {
              if (serverError[key]) {
                modelStateErrors += serverError[key] + '\n';
              }
            }
          }

          return Observable.throw(
            modelStateErrors || serverError || 'Server error'
          );
        }
      });
    }
  }

  export const ErrorInterceptorProvider = {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
  };
