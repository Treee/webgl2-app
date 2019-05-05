import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';

import { RendererEngine } from 'tree-xyz-webgl2-engine';

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

  deltaTime: number = 0;

  sixtyFrames: number = 1000 / 60;
  fourtyFiveFrames: number = 1000 / 45;
  thirtyFrames: number = 1000 / 30;

  activeKeysMap = {};
  mouseInputs = {
    x: 0,
    y: 0,
    leftMouseClicked: false,
    mouseIsMoving: false
  };

  constructor() {
    this.renderer = new RendererEngine();
  }

  ngAfterViewInit() {
    this.renderer.initializeRenderer(this.canvasElement.nativeElement, this.width, this.height);
    this.canvasElement.nativeElement.requestPointerLock = this.canvasElement.nativeElement.requestPointerLock || this.canvasElement.nativeElement.mozRequestPointerLock;
    document['exitPointerLock'] = document['exitPointerLock'] || document['mozExitPointerLock'];
    setInterval(() => {
      this.deltaTime = this.deltaTime + this.sixtyFrames;
      this.renderer.applyUserInput(this.activeKeysMap, this.mouseInputs);
      this.renderer.drawScene(this.deltaTime);
    }, this.sixtyFrames);
  }

  @HostListener('document:keydown', ['$event'])
  @HostListener('document:keyup', ['$event'])
  userKeyPress(event) {
    this.activeKeysMap[event.key] = (event.type === 'keydown');
    // console.log('active keys', this.activeKeysMap);
  }

  @HostListener('document:mousedown', ['$event'])
  userMouseDown(event) {
    if (event.button === 0) {
      this.canvasElement.nativeElement.requestPointerLock();
      // left mouse click start
      // console.log('left click start', event);
      this.mouseInputs.leftMouseClicked = true;
      this.mouseInputs.mouseIsMoving = false;
    }
    if (event.button === 1) {
      return false;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  useMouseMove(event) {
    if (typeof event === 'object' && this.mouseInputs.leftMouseClicked) {
      this.mouseInputs.mouseIsMoving = true;
      this.mouseInputs.x = -event.movementX / 100;
      this.mouseInputs.y = event.movementY / 100;
      // console.log(event);
      // console.log(`DeltaX: ${this.mouseInputs.x} DeltaY ${this.mouseInputs.y}`);
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
          this.mouseInputs.leftMouseClicked = false;
          this.mouseInputs.mouseIsMoving = false;
          break;
        case 1:
          console.log('mouse event', 'Middle button clicked.');
          break;
        case 2:
          console.log('mouse event', 'Right button clicked.');
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