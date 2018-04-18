import { Component, OnInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';

import { RendererComponent } from '../../renderer/renderer.component';
import { Geometry2D } from '../../models/geometry2d';
import { Vector3 } from 'three';

@Component({
  selector: 'app-geo-wars-2d',
  templateUrl: './geo-wars-2d.component.html',
  styleUrls: ['./geo-wars-2d.component.css']
})
export class GeoWars2dComponent implements OnInit {

  @ViewChild('renderer') renderer: RendererComponent;

  player: Geometry2D;
  asteroids: Geometry2D[];
  renderableObjects: Geometry2D[] = [];
  userInput: any = {
    playerMoveSpeed: 5,
    playerRotateSpeed: 5,
    numAsteroids: 10
  };
  width = 640;
  height = 640;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.resetGame();
  }

  initializeRenderableObjects() {
    let objects = [];
    let playerPosition = new Vector3(320, 320, 0);
    this.player = new Geometry2D(playerPosition, 50, 50);
    this.player.createVertexArrayObject(this.renderer.gl, this.renderer.shaderProgramInfo.basicShader);
    this.player.setColor(Math.random(), Math.random(), Math.random(), 1);
    this.player.transformGeometry(this.renderer.projectionMatrix);
    objects.push(this.player);
    this.initializeAsteroids(this.userInput.numAsteroids);
    objects = objects.concat(this.asteroids);
    this.renderableObjects = objects;
  }

  initializeAsteroids(numAsteroids: number) {
    this.asteroids = [];
    for (let i = 0; i < numAsteroids; i++) {
      let randomWidth = 50;
      let randomHeight = 50
      let randomPosition = new Vector3(this.randomInt(this.width), this.randomInt(this.height), 0);
      let randomRotation = this.randomInt(360);
      let randomScale = this.randomInt(1);
      let tempAsteroid = new Geometry2D(randomPosition, randomWidth, randomHeight);
      tempAsteroid.createVertexArrayObject(this.renderer.gl, this.renderer.shaderProgramInfo.basicShader);
      tempAsteroid.setColor(Math.random(), Math.random(), Math.random(), 1);
      tempAsteroid.rotate(randomRotation);
      if (this.randomInt(100) % 2 === 0)
        tempAsteroid.setAngularVelocity(this.randomInt(7) + 2);
      else
        tempAsteroid.setAngularVelocity((this.randomInt(7) + 2) * -1);
      tempAsteroid.scaleByVector(new Vector3(randomScale, randomScale, randomScale));
      tempAsteroid.transformGeometry(this.renderer.projectionMatrix);
      this.asteroids.push(tempAsteroid);
    }
  }

  gameLoop: any;
  startGameLoop() {
    this.stopGameLoop();
    this.gameLoop = setInterval(() => {
      this.oneLoop(33);
    }, 33);
    // ~30 fps
  }

  stopGameLoop() {
    clearInterval(this.gameLoop);
  }

  resetGame() {
    this.renderer.restartRenderer();
    //this.resetUserInput();
    this.initializeRenderableObjects();
    this.startGameLoop();
  }

  resetUserInput() {
    this.userInput = {
      playerMoveSpeed: 5,
      playerRotateSpeed: 5,
      numAsteroids: 10
    };
  }

  oneLoop(dt) {
    this.applyUserInputs();
    this.moveAsteroids();
    this.redrawScreen();
  }

  moveAsteroids() {
    this.asteroids.forEach((asteroid) => {
      asteroid.rotate(1);
      asteroid.transformGeometry(this.renderer.projectionMatrix);
    });
  }

  // wrapRenderableObjects() {
  //   this.renderableObjects.forEach(renderableObject => {
  //     if (renderableObject.getPosition())
  //   });
  // }

  randomInt(range) {
    return Math.floor(Math.random() * range);
  }

  redrawScreen() {
    this.renderer.drawFrame(0, this.renderer.shaderProgramInfo.basicShader, this.renderableObjects);
  }

  activeKeysMap = {};
  eventTriggered = false;
  @HostListener('document:keyup', ['$event'])
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.activeKeysMap[event.key] = (event.type === 'keydown');
  }

  applyUserInputs() {
    let translation = new Vector3();
    let translateMagnitude = 0;
    let rotation = 0;
    // console.log(this.activeKeysMap);
    this.eventTriggered = false;
    if (this.activeKeysMap['w']) {
      // move forward (top of the screen)
      translateMagnitude = this.userInput.playerMoveSpeed * -1;
      translation.add(new Vector3(0, translateMagnitude, 0));
      this.eventTriggered = true;
    }
    if (this.activeKeysMap['a']) {
      // strafe left
      translateMagnitude = this.userInput.playerMoveSpeed * -1;
      translation.add(new Vector3(translateMagnitude, 0, 0));
      this.eventTriggered = true;
    }
    if (this.activeKeysMap['s']) {
      // move backwards (bottom of the screen)
      translateMagnitude = this.userInput.playerMoveSpeed * 1;
      translation.add(new Vector3(0, translateMagnitude, 0));
      this.eventTriggered = true;
    }
    if (this.activeKeysMap['d']) {
      // strafe right
      translateMagnitude = this.userInput.playerMoveSpeed * 1;
      translation.add(new Vector3(translateMagnitude, 0, 0));
      this.eventTriggered = true;
    }
    if (this.activeKeysMap['q']) {
      // rotate counter clockwise
      rotation = this.userInput.playerRotateSpeed;
      this.eventTriggered = true;
    }
    if (this.activeKeysMap['e']) {
      // rotate clockwise
      rotation = this.userInput.playerRotateSpeed * -1;
      this.eventTriggered = true;
    }
    if (this.activeKeysMap['Escape']) {
      this.stopGameLoop();
    }
    if (this.eventTriggered) {
      this.printDotProduct();
      this.player.translateByVector(translation);
      this.player.rotate(rotation);
      this.player.transformGeometry(this.renderer.projectionMatrix);
      this.redrawScreen();
    }
  }

  printDotProduct() {
    //let northWall = new Vector3(this.width, 0, 0);
    let northWall = new Vector3(0, this.height, 0);
    // let southEastWall = northWall.clone().add(westWall.clone());
    // let eastWall = southEastWall.clone().sub(westWall);
    // let southWall = southEastWall.clone().sub(northWall);
    let myDot = this.player.getPosition().dot(northWall.clone());
    console.log('dot', myDot);
    console.log('north', northWall)
    console.log();
    // console.log('east', eastWall)
    // console.log('south', southWall)
    // console.log('west', westWall)
  }


}
