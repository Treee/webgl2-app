import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { RendererComponent } from '../../renderer/renderer.component';
import { Geometry2D } from '../../models/geometry2d';
import { Vector3 } from 'three';

@Component({
  selector: 'app-playground-2d',
  templateUrl: './playground-2d.component.html',
  styleUrls: ['./playground-2d.component.css']
})
export class Playground2dComponent {

  @ViewChild('renderer') renderer: RendererComponent;

  renderableObjects: Geometry2D[];
  userInput: any = {
    x: 0,
    y: 0,
    rotatecw: 0,
    rotateccw: 0,
    scaleX: 1,
    scaleY: 1
  };
  width = 400;
  height = 400;

  constructor() {
  }

  ngAfterViewInit() {
    this.initializeDefaultRenderableObjects(1);
    this.redrawScreen();
  }

  initializeDefaultRenderableObjects(numObjects: Number) {
    this.renderableObjects = [];
    for (let i = 0; i < numObjects; i++) {
      const geometry = new Geometry2D(new Vector3(50, 50, 0), 10, 10);
      geometry.createVertexArrayObject(this.renderer.gl, this.renderer.shaderProgramInfo.basicShader);
      geometry.setColor(Math.random(), Math.random(), Math.random(), 1);
      geometry.transformGeometry(this.renderer.projectionMatrix);
      this.renderableObjects.push(geometry);
    }
  }

  redrawScreen() {
    this.renderer.drawFrame(0, this.renderer.shaderProgramInfo.basicShader, this.renderableObjects);
  }

  randomInt(range) {
    return Math.floor(Math.random() * range);
  }

  resetUserInput() {
    this.userInput = {
      x: 0,
      y: 0,
      rotatecw: 0,
      rotateccw: 0,
      scaleX: 1,
      scaleY: 1
    };
    this.ngAfterViewInit();
  }

  saveInput(type: string) {
    this.renderableObjects.forEach(renderable => {
      if (type === 'translateX') {
        renderable.translateByVector(new Vector3(this.userInput.x, 0, 0));
      } else if (type === 'translateY') {
        renderable.translateByVector(new Vector3(0, this.userInput.y, 0));
      } else if (type === 'rotatecw') {
        renderable.rotate(this.userInput.rotatecw);
      } else if (type === 'rotateccw') {
        renderable.rotate(-this.userInput.rotateccw);
      } else if (type === 'scaleX') {
        renderable.scaleByVector(new Vector3(this.userInput.scaleX, 0, 0));
      } else if (type === 'scaleY') {
        renderable.scaleByVector(new Vector3(0, this.userInput.scaleY, 0));
      }
      renderable.transformGeometry(this.renderer.projectionMatrix);
    });
    this.renderer.drawFrame(0, this.renderer.shaderProgramInfo.basicShader, this.renderableObjects);
  }

}
