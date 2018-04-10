import { Component, OnInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';

import { RendererComponent } from '../../renderer/renderer.component';
import { Geometry2D } from '../../models/geometry2d';
import { Vector3 } from 'three';

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

  eventTriggered = false;
  identity = new Vector3();
  translationScale = 1;
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // console.log('event', event.key);
    this.eventTriggered = false;
    if (event.key === 'w') {
      // move forward      
    }
    else if (event.key === 'a') {
      // strafe left
    }
    else if (event.key === 's') {
      // move backwards
    }
    else if (event.key === 'd') {
      // strafe right
    }
    else if (event.key === 'q') {
      // rotate left
    }
    else if (event.key === 'e') {
      // rotate right
    }
    if (this.eventTriggered) {
      this.player.transformGeometry(this.renderer.projectionMatrix);
    }
  }


}
