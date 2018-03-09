import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { OperationsRoutingModule } from "./operations.routing";
import { OperationsComponent } from "./operations.component";
import { NewComponent } from "./new.component";
import { ListComponent } from "./list.component";
import { ItemComponent } from "./item.component";
import { OperationsService } from "./operations.service";
import { CounterService } from "./counter.service";

@NgModule({
  imports: [CommonModule, FormsModule, OperationsRoutingModule],
  declarations: [
    OperationsComponent,
    NewComponent,
    ListComponent,
    ItemComponent
  ],
  providers: [
    OperationsService,
    { provide: CounterService, useClass: CounterService }
  ]
})
export class OperationsModule {}
