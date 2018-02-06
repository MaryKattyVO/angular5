import { Component, OnInit } from "@angular/core";
import { Operation } from "./operation.class";
import { OperationsService } from "./operations.service";
import { HttpErrorResponse } from "@angular/common/http";

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
    
    <blockquote>
    <h5>Message: {{ message }}</h5>
    <em><h5>Error: {{ fullError | json }}</h5></em>
  </blockquote>
  `,
  styles: []
})
export class OperationsComponent implements OnInit {
  public numberOfOperations = 0;
  public operations: Operation[] = [];
  public message: string;
  public fullError: any;
  constructor(private operationsService: OperationsService) {}

  ngOnInit() {
    this.refreshData();
  }

  public saveOperation(operation: Operation) {
    this.operationsService
      .saveOperation$(operation)
      .subscribe(this.refreshData.bind(this));
  }

  public deleteOperation(operation: Operation) {
    this.operationsService
      .deleteOperation$(operation)
      .subscribe(this.refreshData.bind(this));
  }

  private refreshData() {
    this.message = `Refreshing Data`;
    this.fullError = "";
    this.operationsService
      .getOperationsList$()
      .subscribe(this.showOperations.bind(this), this.catchError.bind(this));
    this.operationsService
      .getNumberOfOperations$()
      .subscribe(this.showCount.bind(this), this.catchError.bind(this));
  }

  private showOperations(operations: Operation[]) {
    this.operations = operations;
    this.message = `operations Ok`;
  }
  private showCount(data: any) {
    this.numberOfOperations = data.count;
    this.message = `count Ok`;
  }

  private catchError(err) {
    if (err instanceof HttpErrorResponse) {
      this.message = `Http Error: ${err.status}, text: ${err.statusText}`;
    } else {
      this.message = `Unknown error, text: ${err.message}`;
    }
    this.fullError = err;
  }
}
