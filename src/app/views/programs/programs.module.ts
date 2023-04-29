import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramsRoutingModule } from './programs-routing.module';
import { ProgramsComponent } from './programs.component';
import { MatTabsModule } from "@angular/material/tabs";
import { SharedModule } from "../../shared/shared.module";
import { NumberCardComponent } from './number-card/number-card.component';
import { MapCardComponent } from './map-card/map-card.component';
import { TableCardComponent } from './table-card/table-card.component';

@NgModule({
  declarations: [
    ProgramsComponent,
    NumberCardComponent,
    MapCardComponent,
    TableCardComponent
  ],
  imports: [
    CommonModule,
    ProgramsRoutingModule,
    MatTabsModule,
    SharedModule
  ]
})
export class ProgramsModule { }
