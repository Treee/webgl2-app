import { Component, ViewChild, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { Vec3, Vec4, RendererEngine } from 'tree-xyz-webgl2-engine';

@Component({
  selector: 'app-playground-2d',
  templateUrl: './playground-2d.component.html',
  styleUrls: ['./playground-2d.component.css']
})
export class Playground2dComponent implements AfterViewInit {

  @ViewChild('glCanvas') canvasElement: ElementRef;

  isPlaygroundCollapsed = true;
  isRtsCollapsed = false;

  playerRotation: number;

  activeKeysMap: any;

  renderer: RendererEngine;

  userInput: any = {
    x: 200,
    y: 200,
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
    numParticles: 500
  };
  width = 400;
  height = 400;

  gameLoop: any;
  gameIsRunning = false;

  constructor() {
    this.activeKeysMap = {};
    this.renderer = new RendererEngine();
    this.playerRotation = 0;
  }

  ngAfterViewInit() {
    this.renderer.initializeRenderer(this.canvasElement.nativeElement, this.width, this.height);
    this.startGameLoop();
    this.redrawScreen(0);
  }

  startGameLoop() {
    this.gameIsRunning = true;
    let timer, dt = 0;
    this.gameLoop = setInterval(() => {
      this.oneGameLoop(0.016);
      dt = 1 / (performance.now() - timer);
      timer = performance.now();
      // console.log('dt', 1 / dt);
    }, 0.016); // 1/ 60000
  }

  stopGameLoop() {
    this.gameIsRunning = false;
    clearInterval(this.gameLoop);
  }

  oneGameLoop(dt: number) {
    this.applyUserInput();
    let timer = Date.now();
    // console.log('update', (Date.now() - timer));
    timer = Date.now();
    this.redrawScreen(dt);
    // console.log('draw', (Date.now() - timer));
  }

  redrawScreen(dt) {
    // this.renderableObjects.forEach((renderable) => {
    //   // this.printRenderableDebugInfo(renderable);
    // });
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
      scaleY: 1,
      numParticles: 500
    };
    this.activeKeysMap = {};
    // this.ngAfterViewInit();
    // clearInterval(this.gameLoop);
    this.stopGameLoop();
    this.redrawScreen(0);
  }

  @HostListener('document:keydown', ['$event'])
  @HostListener('document:keyup', ['$event'])
  userKeyPress(event) {
    this.activeKeysMap[event.key] = (event.type === 'keydown');
  }

  mouseLeftClick(event) {
    console.log(`x: ${event.layerX}, y: ${event.layerY}`);
  }

  applyUserInput() {
    if (this.activeKeysMap['w']) {
    } if (this.activeKeysMap['s']) {
    } if (this.activeKeysMap['a']) {
    } if (this.activeKeysMap['d']) {
    } if (this.activeKeysMap['q']) {
    } if (this.activeKeysMap['e']) {
    }
  }

  saveInput(type: string) {
    this.redrawScreen(0);
  }

  printRenderableDebugInfo(renderable) {
    console.log('---Debug Info---');
    if (renderable.getTranslationMatrix) { console.log('trans', renderable.getTranslationMatrix().prettyPrint()); }
    if (renderable.getRotationMatrix) { console.log('rotat', renderable.getRotationMatrix().prettyPrint()); }
    if (renderable.getScaleMatrix) { console.log('scale', renderable.getScaleMatrix().prettyPrint()); }
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
