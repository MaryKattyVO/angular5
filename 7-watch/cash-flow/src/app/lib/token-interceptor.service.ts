import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { BusService } from "./bus.service";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  private token: string = "NoAuthorizationProvided";

  constructor(private busService: BusService) {
    this.subscribeToTokenChanges();
  }

  private subscribeToTokenChanges() {
    this.busService.getUserToken$().subscribe(data => this.setTokenIfAny(data));
  }

  private setTokenIfAny(data) {
    if (data && data.token) {
      this.token = data.token;
    }
  }

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = this.setAuthHeader(req);
    return next.handle(authReq);
  }

  private setAuthHeader(req: HttpRequest<any>): HttpRequest<any> {
    const headers = req.headers.set("Authorization", `Bearer ${this.token}`);
    return req.clone({ headers });
  }
}
