import { Component, OnInit } from "@angular/core";
import { CredentialsService } from "./credentials.service";

@Component({
  selector: "cf-registration",
  template: `
  <h2>New Registration</h2>
  <form class="container">
    <label for="email">Email</label>
    <input name="email"
      [(ngModel)]="credential.email"
      type="email"/>
    <label for="password">Password</label>
    <input name="password"
      [(ngModel)]="credential.password"
      type="password"/>
    <button (click)="register()">Register</button>
    <a [routerLink]="['..','login']">Login</a>
  </form>
  {{ registrationResult | json}}
  `,
  styles: []
})
export class RegistrationComponent implements OnInit {
  public credential = { email: "", password: "" };
  public registrationResult;
  constructor(private credentialsService: CredentialsService) {}

  ngOnInit() {}

  public register() {
    this.credentialsService.postRegistration(this.credential).subscribe(
      data => {
        this.registrationResult = data;
      },
      error => {
        this.registrationResult = error;
      }
    );
  }
}
