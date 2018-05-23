import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { Playground2dComponent } from './ui/playground-2d/playground-2d.component';

const routes: Routes = [
  { path: '2d', component: Playground2dComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
