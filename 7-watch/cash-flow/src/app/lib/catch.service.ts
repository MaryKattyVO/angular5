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

@Injectable()
export class CatchInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).do(
      (event: HttpEvent<any>) => {
        console.log(req.url);
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.warn(err.statusText);
          } else {
            console.error(err.statusText);
          }
        }
      }
    );
  }
}
