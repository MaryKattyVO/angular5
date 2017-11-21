import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CredentialsRoutingModule } from "./credentials.routing";
import { LoginComponent } from "./login.component";
import { CredentialsService } from "./credentials.service";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    CredentialsRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [LoginComponent],
  providers: [CredentialsService]
})
export class CredentialsModule {}
