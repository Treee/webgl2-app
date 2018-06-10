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
    geometry.setScale(new Vec3(2, 2, 2));
    geometry.translate(new Vec3(1, 0, 0));
    this.renderableObjects.push(geometry);

    const geometry1 = new BoxGeometry();
    geometry1.createVertexArrayObject(this.renderer.gl, this.renderer.basicShader);
    geometry1.setColor(new Vec4(0, 0, 1, 1));
    geometry1.translate(new Vec3(10, 0, 0));
    this.renderableObjects.push(geometry1);

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
    // this.ngAfterViewInit();
    clearInterval(this.gameLoop);
    this.redrawScreen();
  }

  saveInput(type: string) {
    let count = 1;
    this.renderableObjects.forEach(renderable => {
      if (type === 'translateX') {
        renderable.translate(new Vec3(this.userInput.x, renderable.getPosition().y, 1));
        console.log('position', renderable.getTranslationMatrix().prettyPrint());
        console.log('transform', renderable.getTransform(this.renderer.projectionMatrix).prettyPrint());
      } else if (type === 'translateY') {
        renderable.translate(new Vec3(renderable.getPosition().x, this.userInput.y, 1));
        console.log('position', renderable.getTranslationMatrix().prettyPrint());
      } else if (type === 'rotatecw') {
        renderable.rotate(this.userInput.rotatecw);
      } else if (type === 'rotateccw') {
        renderable.rotate(-this.userInput.rotateccw);
      } else if (type === 'scaleX') {
        renderable.setScale(new Vec3(this.userInput.scaleX * count, renderable.getScale().y, 0));
      } else if (type === 'scaleY') {
        renderable.setScale(new Vec3(renderable.getScale().x, this.userInput.scaleY * count, 0));
      }
      count++;
    });
    this.redrawScreen();
  }

}
