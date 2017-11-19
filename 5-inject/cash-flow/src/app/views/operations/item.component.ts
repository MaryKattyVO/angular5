import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OperationsService } from "./operations.service";
import { Operation } from "./operation";

@Component({
  selector: "cf-item",
  template: `
  <h2>Operation Details</h2>
  <h3>{{ operation | json }}</h3>
  `,
  styles: []
})
export class ItemComponent implements OnInit {
  public operation: Operation;

  constructor(
    private route: ActivatedRoute,
    private operationsService: OperationsService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    this.operation = this.operationsService.getOperationById(id);
  }
}
