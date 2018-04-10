import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { RendererComponent } from '../../renderer/renderer.component';
import { Geometry2D } from '../../models/geometry2d';

@Component({
  selector: 'app-geo-wars-2d',
  templateUrl: './geo-wars-2d.component.html',
  styleUrls: ['./geo-wars-2d.component.css']
})
export class GeoWars2dComponent implements OnInit {

  @ViewChild('renderer') renderer: RendererComponent;

  player: Geometry2D;
  renderableObjects: Geometry2D[] = [];
  userInput: any = {};
  width = 640;
  height = 640;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initializeRenderableObjects();
    this.redrawScreen();
  }

  initializeRenderableObjects() {
    this.player = new Geometry2D(50, 50);
    this.player.createVertexArrayObject(this.renderer.gl, this.renderer.shaderProgramInfo.basicShader);
    this.player.setColor(Math.random(), Math.random(), Math.random(), 1);
    this.player.transformGeometry(this.renderer.projectionMatrix);
    this.renderableObjects.push(this.player);

  }

  redrawScreen() {
    this.renderer.drawFrame(0, this.renderer.shaderProgramInfo.basicShader, this.renderableObjects);
  }


}
