import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { tap } from "rxjs/operators";

@Injectable()
export class CatchInterceptorService implements HttpInterceptor {
  private started;

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.started = Date.now();
    console.debug(req.url);
    return next.handle(req).pipe(tap(this.interceptResponse, this.catchError));
  }

  private interceptResponse(event: HttpEvent<any>) {
    if (event instanceof HttpResponse) {
      const elapsed = Date.now() - this.started;
      console.log(`Request for ${event.url} took ${elapsed} ms.`);
    }
  }

  private catchError(err) {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        console.warn("Not authorized");
      } else {
        console.error(err);
      }
    } else {
      console.error(err.message);
    }
  }

  private catchHttpError(err: HttpErrorResponse) {
    if (err.status === 401) {
      console.warn("Not authorized");
    } else {
      console.error(err.statusText);
    }
  }
}
