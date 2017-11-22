import { Component, OnInit } from "@angular/core";
import { BusService } from "../../bus.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "cf-user-login",
  template: `
  <a *ngIf="userIsAnonymous$ | async; else logged" routerLink="/credentials/login">Log In</a>
  <ng-template #logged><i>Hello!!!</i></ng-template>
  `,
  styles: []
})
export class UserLoginComponent implements OnInit {
  public userIsAnonymous$: Observable<boolean>;
  constructor(private busService: BusService) {}

  ngOnInit() {
    this.userIsAnonymous$ = this.busService.getUserIsAnonymous$();
  }
}
