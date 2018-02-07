import { Component, OnInit, OnDestroy } from "@angular/core";
import { StoreService } from "../../store.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { map } from "rxjs/operators";

@Component({
  selector: "cf-user-message",
  template: `
    {{ userMessage$ | async | uppercase }}
    {{ userMessage }}
  `,
  styles: []
})
export class UserMessageComponent implements OnInit, OnDestroy {
  public userMessage$: Observable<string>;
  public userMessage: string; // {{ userMessage }}
  private subscription: Subscription;
  constructor(private store: StoreService) {}

  ngOnInit() {
    this.subscription = this.store
      .getUserMessage$()
      .subscribe(data => (this.userMessage = data));
    this.userMessage$ = this.store
      .getUserMessage$()
      .pipe(map(data => data + " --- ok"));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
