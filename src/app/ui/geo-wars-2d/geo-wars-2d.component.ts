import { Component, OnInit, ViewChild } from '@angular/core';

import { RendererComponent } from '../../renderer/renderer.component';
import { Geometry2D } from '../../models/geometry2d';

@Component({
  selector: 'app-geo-wars-2d',
  templateUrl: './geo-wars-2d.component.html',
  styleUrls: ['./geo-wars-2d.component.css']
})
export class GeoWars2dComponent implements OnInit {

  @ViewChild('renderer') renderer: RendererComponent;

  renderableObjects: Geometry2D[];
  userInput: any = {};
  width = 640;
  height = 640;

  constructor() { }

  ngOnInit() {
  }

}
