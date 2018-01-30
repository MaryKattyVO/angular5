import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "cf-item",
  template: `
  <h3>
    Operation detail for Id...
  </h3>
  <h5>{{ _id }}</h5>
  `,
  styles: []
})
export class ItemComponent implements OnInit {
  _id: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this._id = this.route.snapshot.params["id"];
  }
}
