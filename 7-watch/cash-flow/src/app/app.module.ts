import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { BrowserModule } from "@angular/platform-browser";
import { CatchInterceptorService } from "./lib/catch-interceptor.service";
import { ComponentsModule } from "./lib/components/components.module";
import { HomeModule } from "./views/home/home.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { NotFoundModule } from "./views/not-found/not-found.module";
import { StoreService } from "./lib/store.service";
import { TokenInterceptorService } from "./lib/token-interceptor.service";

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
    },
    StoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
