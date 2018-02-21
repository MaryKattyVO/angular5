import { Component, OnInit } from "@angular/core";
import { Operation } from "./operation.class";
import { OperationsService } from "./operations.service";
import { StoreService } from "../../lib/store.service";

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
  constructor(
    private operationsService: OperationsService,
    private store: StoreService
  ) {}

  ngOnInit() {
    this.refreshData();
  }

  public saveOperation(operation: Operation) {
    this.operationsService
      .saveOperation$(operation)
      .subscribe(this.refreshData);
  }

  public deleteOperation(operation: Operation) {
    this.operationsService
      .deleteOperation$(operation)
      .subscribe(this.refreshData);
  }

  private refreshData = () => {
    this.operationsService
      .getOperationsList$()
      .subscribe(operations => (this.operations = operations));
    this.operationsService
      .getNumberOfOperations$()
      .subscribe(this.showNumberOfOperations);
  };
  private showNumberOfOperations = (data: any) => {
    this.numberOfOperations = data.count;
    this.store.setUserMessage(`Ops: ${this.numberOfOperations}`);
  };
}
