import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramsRoutingModule } from './programs-routing.module';
import { ProgramsComponent } from './programs.component';
import { CardComponent } from './card/card.component';
import { MatTabsModule } from "@angular/material/tabs";
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    ProgramsComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    ProgramsRoutingModule,
    MatTabsModule,
    SharedModule
  ]
})
export class ProgramsModule { }
