import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subject } from "rxjs/Subject";

@Injectable()
export class BusService {
  private userToken$ = new Subject<any>();
  private userIsAnonymous$ = new BehaviorSubject<boolean>(true);

  constructor() {}

  public getUserToken$(): Observable<any> {
    return this.userToken$.asObservable();
  }

  public getUserIsAnonymous$(): Observable<boolean> {
    return this.userIsAnonymous$.asObservable();
  }

  emitUserToken(userToken: any) {
    this.userToken$.next(userToken);
    this.userIsAnonymous$.next(false);
  }
}
