import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { Playground2dComponent } from './ui/playground-2d/playground-2d.component';
import { GeoWars2dComponent } from './ui/geo-wars-2d/geo-wars-2d.component';

const routes: Routes = [
  { path: '2d', component: Playground2dComponent },
  { path: 'geo-wars-2d', component: GeoWars2dComponent },
  { path: '', component: GeoWars2dComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
