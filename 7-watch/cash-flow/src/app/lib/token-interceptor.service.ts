import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  private token: string = "NoAuthorizationProvided";
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = req.headers.set("Authorization", `Bearer ${this.token}`);
    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }
}
