import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FooterComponent } from "./footer/footer.component";
import { NavComponent } from "./nav/nav.component";
import { TitleComponent } from "./nav/title.component";
import { RouterModule } from "@angular/router";
import { UserLoginComponent } from './nav/user-login.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [FooterComponent, NavComponent, TitleComponent, UserLoginComponent],
  exports: [FooterComponent, NavComponent]
})
export class ComponentsModule {}
