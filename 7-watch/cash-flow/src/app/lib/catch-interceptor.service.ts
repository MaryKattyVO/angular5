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
import "rxjs/add/operator/do";
import { Router } from "@angular/router";

@Injectable()
export class CatchInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .do((event: HttpEvent<any>) => {}, (err: any) => this.catchError(err));
  }

  private catchError(err) {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        this.catchUnauthorized(err);
      } else {
        console.error(err.statusText);
      }
    }
  }

  private catchUnauthorized(err) {
    console.warn(err.statusText);
    this.navigateToLogin();
  }
  private navigateToLogin() {
    this.router.navigateByUrl("/credentials/login");
  }
}
