import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class BusService {
  private userToken$ = new Subject<any>();

  constructor() {}

  public getUserToken$(): Observable<any> {
    return this.userToken$.asObservable();
  }

  emitUserToken(userToken: any) {
    this.userToken$.next(userToken);
  }
}
