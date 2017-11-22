import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { LoginComponent } from "./login.component";
// import { RegistrationComponent } from "./registration.component";
import { CredentialsModule } from "./credentials.module";
import { CredentialsComponent } from "./credentials.component";

const routes: Routes = [
  {
    path: "login",
    component: CredentialsComponent,
    data: [
      {
        alternate: "Registration",
        credential: { email: "admin@cash-flow.com", password: "secret" },
        title: "LogIn"
      }
    ]
  },
  {
    path: "registration",
    component: CredentialsComponent,
    data: [
      {
        alternate: "LogIn",
        credential: { email: "", password: "" },
        title: "Registration"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CredentialsRoutingModule {}
