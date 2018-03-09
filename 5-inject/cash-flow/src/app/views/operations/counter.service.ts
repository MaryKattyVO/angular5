import { Injectable } from "@angular/core";

@Injectable()
export class CounterService {
  public getCount(array: any[]): number {
    return array.length;
  }
}
