import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StorageService } from '../storage.service';
import { EventBusService } from 'src/app/_shared/event-bus.service';
import { EventData } from 'src/app/_shared/event.class';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private storageService: StorageService,
    private eventBusService: EventBusService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          // TODO: Check for unintentional logouts
          // req.url.includes('/auth') &&
          error.status === 401
        ) {
          return this.handleAuthError(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handleAuthError(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (this.storageService.isLoggedIn()) {
        // TODO: Maybe try migrating to ngrx/store
        this.eventBusService.emit(new EventData('logout', null));
      }
    }

    return next.handle(request);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
