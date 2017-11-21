import { Component, OnInit } from "@angular/core";
import { CredentialsService } from "./credentials.service";
import { BusService } from "../../lib/bus.service";

@Component({
  selector: "cf-login",
  template: `
  <h2>Log In</h2>
  <form class="container">
    <label for="email">Email</label>
    <input name="email"
      [(ngModel)]="credential.email"
      type="email"/>
    <label for="password">Password</label>
    <input name="password"
      [(ngModel)]="credential.password"
      type="password"/>
    <button (click)="login()">Login</button>
    <a [routerLink]="['..','registration']">Register</a>
  </form>
  {{ loginResult | json}}
  `,
  styles: []
})
export class LoginComponent implements OnInit {
  public credential = { email: "admin@cash-flow.com", password: "secret" };
  public loginResult;
  constructor(
    private credentialsService: CredentialsService,
    private busService: BusService
  ) {}

  ngOnInit() {}

  public login() {
    this.credentialsService.postLogin(this.credential).subscribe(
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
