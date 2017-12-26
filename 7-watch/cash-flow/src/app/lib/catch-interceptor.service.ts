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
import { Router } from "@angular/router";

@Injectable()
export class CatchInterceptorService implements HttpInterceptor {
  private started;

  constructor(private router: Router) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.started = Date.now();
    const handledRequest = next.handle(req);
    const successCallback = this.interceptResponse.bind(this);
    const errorCallback = this.catchError.bind(this);
    const interceptionOperator = tap<HttpEvent<any>>(
      successCallback,
      errorCallback
    );
    return handledRequest.pipe(interceptionOperator);
  }

  private interceptResponse(event: HttpEvent<any>) {
    if (event instanceof HttpResponse) {
      const elapsed_ms = Date.now() - this.started;
      console.debug(`Request for ${event.url} took ${elapsed_ms} ms.`);
    }
  }

  private catchError(err) {
    if (err instanceof HttpErrorResponse) {
      this.catchHttpError(err);
    } else {
      console.error(err.message);
    }
  }

  private catchHttpError(err: HttpErrorResponse) {
    if (err.status === 401) {
      this.catchUnauthorized();
    } else {
      console.warn(err.statusText);
    }
  }

  private catchUnauthorized() {
    console.log("Not authorized");
    this.navigateToLogin();
  }
  private navigateToLogin() {
    this.router.navigateByUrl("/credentials/login");
  }
}
