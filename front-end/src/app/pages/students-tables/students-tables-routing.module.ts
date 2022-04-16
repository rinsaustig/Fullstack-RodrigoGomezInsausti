import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentsTablesPage } from './students-tables.page';

const routes: Routes = [
  {
    path: '',
    component: StudentsTablesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsTablesPageRoutingModule {}
