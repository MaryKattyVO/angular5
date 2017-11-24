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
    <h5>{{ message }}</h5>
    <h5>{{ fullError | json }}</h5>
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
      .subscribe(data => this.refreshData());
  }

  public deleteOperation(operation: Operation) {
    this.operationsService
      .deleteOperation$(operation)
      .subscribe(data => this.refreshData());
  }

  private refreshData() {
    this.operationsService
      .getOperationsList$()
      .subscribe(data => (this.operations = data), err => this.catchError(err));
    this.operationsService
      .getNumberOfOperations$()
      .subscribe(
        data => (this.numberOfOperations = data.count),
        err => this.catchError(err)
      );
  }

  private catchError(err) {
    if (err instanceof HttpErrorResponse) {
      this.catchHttpError(err);
    } else {
      console.error(err.message);
    }
  }

  private catchHttpError(err: HttpErrorResponse) {
    this.message = `Server returned code ${err.status}, text: ${
      err.statusText
    }`;
    this.fullError = err;
  }
}
