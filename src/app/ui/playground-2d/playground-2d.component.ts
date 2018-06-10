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

  gameLoop: any;

  constructor() {
    this.renderableObjects = [];
    this.renderer = new RendererEngine();
  }

  ngAfterViewInit() {
    this.renderer.initializeRenderer(this.canvasElement.nativeElement, this.width, this.height);
    this.initializeDefaultRenderableObjects(5);
    this.gameLoop = setInterval(() => {
      this.redrawScreen();
    }, 60);
  }

  initializeDefaultRenderableObjects(numObjects: Number) {
    this.renderableObjects = [];
    const geometry = new BoxGeometry();
    geometry.createVertexArrayObject(this.renderer.gl, this.renderer.basicShader);
    geometry.setColor(new Vec4(1, 0, 0, 1));
    // geometry.setScale(new Vec3(2, 2, 2));
    geometry.translate(new Vec3(1, 0, 0));
    this.renderableObjects.push(geometry);
    console.log('translation', geometry.getTranslationMatrix().prettyPrint());
    console.log('scale', geometry.getScaleMatrix().prettyPrint());
    console.log('rotate', geometry.getRotationMatrix().prettyPrint());
    console.log('projection', this.renderer.projectionMatrix.prettyPrint());
    console.log('transform', geometry.getTransform(this.renderer.projectionMatrix).prettyPrint());

    const geometry1 = new BoxGeometry();
    geometry1.createVertexArrayObject(this.renderer.gl, this.renderer.basicShader);
    geometry1.setColor(new Vec4(0, 0, 1, 1));
    geometry1.translate(new Vec3(10, 0, 0));
    this.renderableObjects.push(geometry1);

  }

  redrawScreen() {
    this.renderer.drawFrame(0, this.renderableObjects);
    this.renderableObjects.forEach(obj => {
      // console.log('objection postion', obj.getPosition());
      // console.log('objection postion', obj.getTransform(this.renderer.projectionMatrix));
    });
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
    // this.ngAfterViewInit();
    clearInterval(this.gameLoop);
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
