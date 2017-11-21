import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CredentialsRoutingModule } from "./credentials.routing";
import { LoginComponent } from "./login.component";
import { CredentialsService } from "./credentials.service";
import { FormsModule } from "@angular/forms";
import { RegistrationComponent } from "./registration.component";

@NgModule({
  imports: [CommonModule, CredentialsRoutingModule, FormsModule],
  declarations: [LoginComponent, RegistrationComponent],
  providers: [CredentialsService]
})
export class CredentialsModule {}
