import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { Playground2dComponent } from './ui/playground-2d/playground-2d.component';
import { PathFinderComponent } from './ui/path-finder/path-finder.component';
import { Playground3dComponent } from './ui/playground-3d/playground-3d.component';

const routes: Routes = [
  { path: '2d', component: Playground2dComponent },
  { path: '3d', component: Playground3dComponent },
  { path: 'pathfinder', component: PathFinderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
