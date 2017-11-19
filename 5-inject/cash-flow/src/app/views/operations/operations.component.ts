import { Component, OnInit } from "@angular/core";
import { Operation } from "./operation";
import { OperationsService } from "./operations.service";

@Component({
  selector: "cf-operations",
  template: `
    <cf-new 
      [numberOfOperations]="numberOfOperations" 
      (save)="saveOperation($event)">
    </cf-new>
    <cf-list 
      [numberOfOperations]="numberOfOperations" 
      [operations]="operations" 
      (delete)="deleteOperation($event)" >
    </cf-list>
  `,
  styles: []
})
export class OperationsComponent implements OnInit {
  public numberOfOperations = 0;
  public operations: Operation[] = [];
  constructor(private operationsService: OperationsService) {}

  ngOnInit() {
    this.refreshData();
  }

  public saveOperation(operation: Operation) {
    this.operationsService.saveOperation(operation);
    this.refreshData();
  }

  public deleteOperation(operation: Operation) {
    this.operationsService.deleteOperation(operation);
    this.refreshData();
  }

  private refreshData() {
    this.numberOfOperations = this.operationsService.getNumberOfOperations();
    this.operations = this.operationsService.getOperationsList();
  }
}
