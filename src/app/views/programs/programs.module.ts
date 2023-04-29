import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramsRoutingModule } from './programs-routing.module';
import { ProgramsComponent } from './programs.component';
import { TabComponent } from './tab/tab.component';
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [
    ProgramsComponent,
    TabComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    ProgramsRoutingModule
  ]
})
export class ProgramsModule { }
