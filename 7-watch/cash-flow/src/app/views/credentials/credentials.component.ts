import { Component, OnInit } from "@angular/core";
import { CredentialsService } from "./credentials.service";
import { BusService } from "../../lib/bus.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "cf-login",
  template: `
  <h2>{{pageData.title}}</h2>
  <form class="container">
    <label for="email">Email</label>
    <input name="email"
      [(ngModel)]="pageData.credential.email"
      type="email"/>
    <label for="password">Password</label>
    <input name="password"
      [(ngModel)]="pageData.credential.password"
      type="password"/>
    <button (click)="sendCredential()">{{ pageData.title }}</button>
    <a [routerLink]="['..',pageData.alternate | lowercase]">{{ pageData.alternate }}</a>
  </form>
  {{ loginResult | json}}
  {{ pageData | json}}
  `,
  styles: []
})
export class CredentialsComponent implements OnInit {
  public loginResult;

  public pageData = {
    alternate: "Registration",
    credential: { email: "admin@cash-flow.com", password: "secret" },
    title: "LogIn"
  };

  constructor(
    private busService: BusService,
    private credentialsService: CredentialsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.pageData = this.activatedRoute.snapshot.data[0];
  }

  public sendCredential() {
    this.credentialsService
      .sendCredential(this.pageData.credential, this.pageData.title)
      .subscribe(
        data => {
          this.loginResult = data;
          this.busService.emitUserToken(data);
        },
        error => {
          this.loginResult = error;
        }
      );
  }
}
