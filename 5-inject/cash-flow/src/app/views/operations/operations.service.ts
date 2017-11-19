import { Injectable } from "@angular/core";
import { Operation } from "./operation";

@Injectable()
export class OperationsService {
  private operations: Operation[] = [];

  constructor() {}

  public getNumberOfOperations(): number {
    return this.operations.length;
  }

  public getOperationsList(): Operation[] {
    return this.operations;
  }

  public getOperationById(id: string): Operation {
    return this.operations.find(o => o._id === id);
  }

  public saveOperation(operation: Operation) {
    operation._id = new Date().getTime().toString();
    this.operations.push(operation);
  }

  public deleteOperation(operation: Operation) {
    const index = this.operations.indexOf(operation);
    this.operations.splice(index, 1);
  }
}
