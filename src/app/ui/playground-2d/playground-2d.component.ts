import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { RendererComponent } from '../../renderer/renderer.component';
import { Geometry2D } from '../../models/geometry2d';

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
      const geometry = new Geometry2D(10, 10);
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
        renderable.translate(this.userInput.x, renderable.getPosition().y, renderable.getPosition().z);
      } else if (type === 'translateY') {
        renderable.translate(renderable.getPosition().x, this.userInput.y, renderable.getPosition().z);
      } else if (type === 'rotatecw') {
        renderable.rotate(this.userInput.rotatecw);
      } else if (type === 'rotateccw') {
        renderable.rotate(-this.userInput.rotateccw);
      } else if (type === 'scaleX') {
        renderable.setScale(this.userInput.scaleX, renderable.getScale().y, renderable.getScale().z);
      } else if (type === 'scaleY') {
        renderable.setScale(renderable.getScale().x, this.userInput.scaleY, renderable.getScale().z);
      }
      renderable.transformGeometry(this.renderer.projectionMatrix);
    });
    this.renderer.drawFrame(0, this.renderer.shaderProgramInfo.basicShader, this.renderableObjects);
  }

}
