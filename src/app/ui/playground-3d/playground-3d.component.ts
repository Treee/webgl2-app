import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';

import { RendererEngine, InputManager } from 'tree-xyz-webgl2-engine';

@Component({
  selector: 'app-playground-3d',
  templateUrl: './playground-3d.component.html',
  styleUrls: ['./playground-3d.component.css']
})
export class Playground3dComponent implements AfterViewInit {

  @ViewChild('glCanvas') canvasElement: ElementRef;
  @ViewChild('textureImage') textureImage: ElementRef;

  width = 1366;
  height = 768;

  renderer: RendererEngine;
  userInput: InputManager;

  deltaTime = 0;

  sixtyFrames: number = 1000 / 60;
  fourtyFiveFrames: number = 1000 / 45;
  thirtyFrames: number = 1000 / 30;

  // sactiveKeysMap = {};
  // leftMouseButtonInfo = {
  //   x: 0,
  //   y: 0,
  //   leftMouseClicked: false,
  //   mouseIsMoving: false
  // };

  // rightMouseButtonInfo = {
  //   x: 0,
  //   y: 0,
  //   isButtonClicked: false,
  //   isMouseMoving: false
  // };

  constructor() {
    this.userInput = new InputManager();
    this.renderer = new RendererEngine(this.userInput);
  }

  ngAfterViewInit() {
    this.renderer.initializeRenderer(this.canvasElement.nativeElement, this.width, this.height);
    // tslint:disable-next-line:max-line-length
    this.canvasElement.nativeElement.requestPointerLock = this.canvasElement.nativeElement.requestPointerLock || this.canvasElement.nativeElement.mozRequestPointerLock;
    document['exitPointerLock'] = document['exitPointerLock'] || document['mozExitPointerLock'];
    setInterval(() => {
      this.deltaTime = this.deltaTime + this.sixtyFrames;
      // this.renderer.applyUserInput(this.activeKeysMap, this.leftMouseButtonInfo, this.rightMouseButtonInfo);
      this.renderer.applyUserInput(this.userInput);
      this.renderer.drawScene(this.deltaTime);
    }, this.sixtyFrames);
  }

  @HostListener('document:keydown', ['$event'])
  @HostListener('document:keyup', ['$event'])
  userKeyPress(event) {
    this.userInput.keyboard.activeKeysMap[event.key] = (event.type === 'keydown');
    // console.log('active keys', this.userInput.keyboard.activeKeysMap[event.key]);
  }

  @HostListener('document:mousedown', ['$event'])
  userMouseDown(event) {
    if (event.button === 0) {
      this.canvasElement.nativeElement.requestPointerLock();
      // left mouse click start
      // console.log('left click start', event);
      this.userInput.mouse.leftMouseButtonInfo.isButtonClicked = true;
      this.userInput.mouse.leftMouseButtonInfo.isMouseMoving = false;
    }
    if (event.button === 1) {
      return false;
    }
    if (event.button === 2) {
      this.canvasElement.nativeElement.requestPointerLock();
      // right mouse click start
      // console.log('right click start', event);
      this.userInput.mouse.rightMouseButtonInfo.isButtonClicked = true;
      this.userInput.mouse.rightMouseButtonInfo.isMouseMoving = false;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  useMouseMove(event) {
    if (typeof event === 'object' && this.userInput.mouse.leftMouseButtonInfo.isButtonClicked) {
      this.userInput.mouse.leftMouseButtonInfo.isMouseMoving = true;
      this.userInput.mouse.leftMouseButtonInfo.x = -event.movementX / 100;
      this.userInput.mouse.leftMouseButtonInfo.y = event.movementY / 100;
      // console.log(event);
      // console.log(`DeltaX: ${this.leftMouseButtonInfo.x} DeltaY ${this.leftMouseButtonInfo.y}`);
      // console.log(`x mov: ${event.movementX} y move: ${event.movementY}`);
    } else if (typeof event === 'object' && this.userInput.mouse.rightMouseButtonInfo.isButtonClicked) {
      this.userInput.mouse.rightMouseButtonInfo.isMouseMoving = true;
      this.userInput.mouse.rightMouseButtonInfo.x = -event.movementX / 100;
      this.userInput.mouse.rightMouseButtonInfo.y = event.movementY / 100;
      // console.log(event);
      // console.log(`DeltaX: ${this.rightMouseButtonInfo.x} DeltaY ${this.rightMouseButtonInfo.y}`);
      // console.log(`x mov: ${event.movementX} y move: ${event.movementY}`);
    }
  }

  @HostListener('document:mouseup', ['$event'])
  userMousePress(event) {
    if (typeof event === 'object') {
      switch (event.button) {
        case 0:
          // console.log('mouse event', 'Left button clicked.');
          document['exitPointerLock']();
          this.userInput.mouse.leftMouseButtonInfo.isButtonClicked = false;
          this.userInput.mouse.leftMouseButtonInfo.isMouseMoving = false;
          break;
        case 1:
          console.log('mouse event', 'Middle button clicked.');
          break;
        case 2:
          // console.log('mouse event', 'Right button clicked.');
          document['exitPointerLock']();
          this.userInput.mouse.rightMouseButtonInfo.isButtonClicked = false;
          this.userInput.mouse.rightMouseButtonInfo.isMouseMoving = false;
          break;
        default:
          console.log('mouse event', `Unknown button code: ${event}`);
      }
    }
  }

  @HostListener('document:pointerlockchange', ['$event'])
  @HostListener('document:mozpointerlockchange', ['$event'])
  pointerLockChangeAlert(event) {
    // console.log(`x mov: ${event.movementX} y move: ${event.movementY}`);
  }

}
