import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { BoxGeometry, Vec3, Vec4, RendererEngine } from 'tree-xyz-webgl2-engine';
import { Vector4 } from 'three';

@Component({
  selector: 'app-playground-2d',
  templateUrl: './playground-2d.component.html',
  styleUrls: ['./playground-2d.component.css']
})
export class Playground2dComponent implements AfterViewInit {

  @ViewChild('glCanvas') canvasElement: ElementRef;

  renderableObjects: BoxGeometry[];
  renderer: RendererEngine;

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
    this.renderableObjects = [];
    this.renderer = new RendererEngine();
  }

  ngAfterViewInit() {
    this.renderer.initializeRenderer(this.canvasElement.nativeElement, this.width, this.height);
    this.initializeDefaultRenderableObjects(1);
    this.redrawScreen();
  }

  initializeDefaultRenderableObjects(numObjects: Number) {
    this.renderableObjects = [];
    for (let i = 0; i < numObjects; i++) {
      const geometry = new BoxGeometry(new Vec3(50, 50, 0), 10, 10);
      geometry.createVertexArrayObject(this.renderer.gl, this.renderer.basicShader);
      geometry.setColor(new Vec4(Math.random(), Math.random(), Math.random(), 1));
      geometry.translate(this.renderer.projectionMatrix);
      this.renderableObjects.push(geometry);
    }
  }

  redrawScreen() {
    this.renderer.drawFrame(0, this.renderableObjects);
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
        renderable.translateByVector(new Vec3(this.userInput.x, 0, 0));
      } else if (type === 'translateY') {
        renderable.translateByVector(new Vec3(0, this.userInput.y, 0));
      } else if (type === 'rotatecw') {
        renderable.rotate(this.userInput.rotatecw);
      } else if (type === 'rotateccw') {
        renderable.rotate(-this.userInput.rotateccw);
      } else if (type === 'scaleX') {
        renderable.scaleByVector(new Vec3(this.userInput.scaleX, 0, 0));
      } else if (type === 'scaleY') {
        renderable.scaleByVector(new Vec3(0, this.userInput.scaleY, 0));
      }
      renderable.transformGeometry(this.renderer.projectionMatrix);
    });
    this.renderer.drawFrame(0, this.renderableObjects);
  }

}
