import { Component, ViewChild, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { BoxGeometry, Point2D, Vec3, Vec4, RendererEngine } from 'tree-xyz-webgl2-engine';
import { ParticleSystem } from 'tree-xyz-webgl2-engine/dist/particle-system/particle-system';
import { NewParticleSystem } from 'tree-xyz-webgl2-engine/dist/particle-system/new-particle-system';

@Component({
  selector: 'app-playground-2d',
  templateUrl: './playground-2d.component.html',
  styleUrls: ['./playground-2d.component.css']
})
export class Playground2dComponent implements AfterViewInit {

  @ViewChild('glCanvas') canvasElement: ElementRef;

  isPlaygroundCollapsed = true;
  isRtsCollapsed = false;


  particleGenerator: ParticleSystem;
  particleGeneratorRunning = false;

  newParticleGenerator: NewParticleSystem;

  playerObject: BoxGeometry;
  playerRotation: number;

  renderableObjects: BoxGeometry[];
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
    this.renderableObjects = [];
    this.activeKeysMap = {};
    this.renderer = new RendererEngine();
    this.playerRotation = 0;
  }

  ngAfterViewInit() {
    this.renderer.initializeRenderer(this.canvasElement.nativeElement, this.width, this.height);
    this.initializeDefaultRenderableObjects(1);
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

  initializePlayer() {
    this.playerObject = new BoxGeometry();
    this.playerObject.createVertexArrayObject(this.renderer.gl, this.renderer.basicShader);
    this.playerObject.setColor(new Vec4(1, 0, 0, 1));
    // this.playerObject.setScale(new Vec3(2, 2, 2));
    this.playerObject.translate(new Vec3(200, 200, 0));
    this.renderableObjects.push(this.playerObject);
    // console.log('creating player', this.playerObject);
  }

  initializeDefaultRenderableObjects(numObjects: Number) {
    this.renderableObjects = [];
    // this.initializeParticles(this.userInput.numParticles, new Vec3(100, 100, 0));
    this.initializeNewParticles(this.userInput.numParticles, new Vec3(100, 100, 0));
    //this.initializePlayer();
  }

  initializeParticles(numParticles: number, position: Vec3) {
    this.particleGenerator = new ParticleSystem(position, numParticles, this.renderer.gl, this.renderer.basicShader);
    this.renderableObjects = this.particleGenerator.particles;
    // console.log('particles', this.particleGenerator.particles);
  }

  initializeNewParticles(numParticles: number, position: Vec3) {
    this.newParticleGenerator = new NewParticleSystem(this.renderer.gl, this.renderer.basicShader, numParticles, position);
    this.renderableObjects = this.newParticleGenerator.particles;
    // console.log('particles', this.particleGenerator.particles);
  }

  oneGameLoop(dt: number) {
    this.applyUserInput();
    let timer = Date.now();
    // this.particleGenerator.update(dt);
    this.newParticleGenerator.update(dt);
    // console.log('update', (Date.now() - timer));
    timer = Date.now();
    this.redrawScreen(dt);
    // console.log('draw', (Date.now() - timer));
  }

  redrawScreen(dt) {
    // this.renderableObjects.forEach((renderable) => {
    //   // this.printRenderableDebugInfo(renderable);
    // });
    this.renderer.drawFrame(dt, this.renderableObjects);
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
    this.initializeParticles(this.userInput.numParticles, new Vec3(event.layerX, event.layerY, 0));
    console.log(`x: ${event.layerX}, y: ${event.layerY}`);
  }

  applyUserInput() {
    if (this.activeKeysMap['w']) {
      this.playerObject.translate(this.playerObject.getPosition().add(new Vec3(0, -1, 0)));
    } if (this.activeKeysMap['s']) {
      this.playerObject.translate(this.playerObject.getPosition().add(new Vec3(0, 1, 0)));
    } if (this.activeKeysMap['a']) {
      this.playerObject.translate(this.playerObject.getPosition().add(new Vec3(-1, 0, 0)));
    } if (this.activeKeysMap['d']) {
      this.playerObject.translate(this.playerObject.getPosition().add(new Vec3(1, 0, 0)));
    } if (this.activeKeysMap['q']) {
      this.playerObject.rotate(this.playerRotation -= 10);
    } if (this.activeKeysMap['e']) {
      this.playerObject.rotate(this.playerRotation += 10);
    }
  }

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
