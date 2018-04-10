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

  activeKeysMap = {};
  eventTriggered = false;
  translationScale = 1;
  rotation = 0;
  @HostListener('document:keyup', ['$event'])
  test(event: KeyboardEvent) {
    this.activeKeysMap[event.key] = (event.type === 'keydown');
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let translation = new Vector3();
    console.log(`event key ${event.key} event type ${event.type}`);
    this.activeKeysMap[event.key] = (event.type === 'keydown');
    console.log(this.activeKeysMap);
    this.eventTriggered = false;
    if (this.activeKeysMap['w']) {
      // move forward (top of the screen)
      translation.add(new Vector3(0, -1, 0));
      this.eventTriggered = true;
    }
    if (this.activeKeysMap['a']) {
      // strafe left
      translation.add(new Vector3(-1, 0, 0));
      this.eventTriggered = true;
    }
    if (this.activeKeysMap['s']) {
      // move backwards (bottom of the screen)
      translation.add(new Vector3(0, 1, 0));
      this.eventTriggered = true;
    }
    if (this.activeKeysMap['d']) {
      // strafe right
      translation.add(new Vector3(1, 0, 0));
      this.eventTriggered = true;
    }
    if (this.activeKeysMap['q']) {
      // rotate counter clockwise
      this.rotation = ((this.rotation + 1) % 360);
      this.eventTriggered = true;
    }
    if (this.activeKeysMap['e']) {
      // rotate clockwise
      this.rotation = ((this.rotation - 1) % 360);
      this.eventTriggered = true;
    }
    if (this.eventTriggered) {
      this.player.translateByVector(translation);
      this.player.rotate(this.rotation);
      this.player.transformGeometry(this.renderer.projectionMatrix);
      this.redrawScreen();
    }
  }


}
