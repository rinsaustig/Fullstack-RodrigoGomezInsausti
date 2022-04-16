import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentsTablesPageRoutingModule } from './students-tables-routing.module';

import { StudentsTablesPage } from './students-tables.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentsTablesPageRoutingModule
  ],
  declarations: [StudentsTablesPage]
})
export class StudentsTablesPageModule {}
