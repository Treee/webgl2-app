import { Component, ViewChild, AfterViewInit, ElementRef, HostListener } from '@angular/core';
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
  activeKeysMap: any;

  renderer: RendererEngine;

  userInput: any = {
    x: 200,
    y: 200,
    rotate: 0,
    scaleX: 1,
    scaleY: 1
  };
  width = 400;
  height = 400;

  gameLoop: any;

  constructor() {
    this.renderableObjects = [];
    this.activeKeysMap = {};
    this.renderer = new RendererEngine();
  }

  ngAfterViewInit() {
    this.renderer.initializeRenderer(this.canvasElement.nativeElement, this.width, this.height);
    this.initializeDefaultRenderableObjects(1);
    this.startGameLoop();
    this.redrawScreen();
  }

  startGameLoop() {
    this.gameLoop = setInterval(() => {
      this.oneGameLoop();
    }, 60);
  }

  initializeDefaultRenderableObjects(numObjects: Number) {
    this.renderableObjects = [];
    const geometry = new BoxGeometry();
    geometry.createVertexArrayObject(this.renderer.gl, this.renderer.basicShader);
    geometry.setColor(new Vec4(1, 0, 0, 1));
    // geometry.setScale(new Vec3(2, 2, 2));
    geometry.translate(new Vec3(200, 200, 0));
    this.renderableObjects.push(geometry);
  }

  oneGameLoop() {
    this.redrawScreen();
  }

  redrawScreen() {
    // this.renderableObjects.forEach((renderable) => {
    //   this.printDebugInfo(renderable);
    // });
    this.renderer.drawFrame(0, this.renderableObjects);
  }

  randomInt(range) {
    return Math.floor(Math.random() * range);
  }

  resetUserInput() {
    this.userInput = {
      x: 0,
      y: 0,
      rotate: 0,
      scaleX: 1,
      scaleY: 1
    };
    this.activeKeysMap = {};
    // this.ngAfterViewInit();
    clearInterval(this.gameLoop);
    this.redrawScreen();
  }

  @HostListener('document:keydown', ['$event'])
  @HostListener('document:keyup', ['$event'])
  userKeyPress(event) {
    this.activeKeysMap[event.key] = (event.type === 'keydown');
    // this.printKeyboardDebugInfo('test');
  }

  // captureUserInput(keycode) {
  //   // console.log('key', keycode);
  //   let type = '';
  //   if (keycode.code === 'KeyW') {
  //     type = 'translateY';
  //     this.userInput.y -= 1;
  //   } else if (keycode.code === 'KeyS') {
  //     type = 'translateY';
  //     this.userInput.y += 1;
  //   } else if (keycode.code === 'KeyA') {
  //     type = 'translateX';
  //     this.userInput.x -= 1;
  //   } else if (keycode.code === 'KeyD') {
  //     type = 'translateX';
  //     this.userInput.x += 1;
  //   } else if (keycode.code === 'KeyQ') {
  //     this.userInput.rotate -= 1;
  //     type = 'rotateccw';
  //   } else if (keycode.code === 'KeyE') {
  //     this.userInput.rotate += 1;
  //     type = 'rotatecw';
  //   }
  //   this.saveInput(type);
  // }

  saveInput(type: string) {
    this.renderableObjects.forEach(renderable => {
      if (type === 'translateX') {
        renderable.translate(new Vec3(this.userInput.x, renderable.getPosition().y, 1));
      } else if (type === 'translateY') {
        renderable.translate(new Vec3(renderable.getPosition().x, this.userInput.y, 1));
      } else if (type === 'rotatecw') {
        console.log('rotation', this.userInput.rotate);
        renderable.rotate(this.userInput.rotate);
      } else if (type === 'rotateccw') {
        renderable.rotate(this.userInput.rotate);
      } else if (type === 'scaleX') {
        renderable.setScale(new Vec3(this.userInput.scaleX, renderable.getScale().y, 0));
      } else if (type === 'scaleY') {
        renderable.setScale(new Vec3(renderable.getScale().x, this.userInput.scaleY, 0));
      }
    });
    this.redrawScreen();
  }

  printRenderableDebugInfo(renderable) {
    console.log('---Debug Info---');
    console.log('trans', renderable.getTranslationMatrix().prettyPrint());
    console.log('rotat', renderable.getRotationMatrix().prettyPrint());
    console.log('scale', renderable.getScaleMatrix().prettyPrint());
    console.log('transform', renderable.getTransform(this.renderer.projectionMatrix).prettyPrint());
    console.log('transform', renderable.getTransform(this.renderer.projectionMatrix).toArray());
    console.log();
  }

  printKeyboardDebugInfo(customMessage: string) {
    console.log(customMessage);
    console.log(`# of Keys currently pressed ${this.activeKeysMap}`, this.activeKeysMap);
    console.log('End');
  }

}
