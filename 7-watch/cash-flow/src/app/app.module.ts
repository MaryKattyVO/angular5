import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { ComponentsModule } from "./lib/components/components.module";
import { HomeModule } from "./views/home/home.module";
import { NotFoundModule } from "./views/not-found/not-found.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptorService } from "./lib/token-interceptor.service";
import { CatchInterceptorService } from "./lib/catch-interceptor.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ComponentsModule,
    HomeModule,
    HttpClientModule,
    NotFoundModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CatchInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
