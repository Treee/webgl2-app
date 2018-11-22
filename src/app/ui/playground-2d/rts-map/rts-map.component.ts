import { Component, ViewChild, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { BoxGeometry, Point2D, Vec3, Vec4, RendererEngine } from 'tree-xyz-webgl2-engine';

import { Grid2D } from 'tree-xyz-webgl2-engine/dist/data-structures/grid-2d';
import { Grid2DCell } from 'tree-xyz-webgl2-engine/dist/data-structures/grid-2d-cell';
import { AStar } from 'tree-xyz-webgl2-engine/dist/algorithms/a-star';
import { LiteralExpr } from '@angular/compiler';

@Component({
  selector: 'app-rts-map',
  templateUrl: './rts-map.component.html',
  styleUrls: ['./rts-map.component.css']
})
export class RtsMapComponent implements AfterViewInit {

  @ViewChild('glCanvas') canvasElement: ElementRef;

  mapGrid: Grid2D;
  pathFinder: AStar;

  renderableObjects: BoxGeometry[];

  renderer: RendererEngine;

  width = 400;
  height = 400;

  gameLoop: any;

  constructor() {
    this.renderableObjects = [];
    this.renderer = new RendererEngine();
    this.initializeGrid();
  }

  initializeGrid() {
    this.mapGrid = new Grid2D();
    // this.grid.initializeGrid(this.gridProperties.rows, this.gridProperties.cols);
    this.mapGrid.initializeGrid(5, 5);
    // this.grid.loadGrid(this.gridProperties.defaultMaze);
    this.mapGrid.loadGrid('soobo\nobobo\nooooo\nbobbb\noooof');
    this.mapGrid.connectGridCells();
  }

  ngAfterViewInit() {
    this.renderer.initializeRenderer(this.canvasElement.nativeElement, this.width, this.height);
    this.initializeDefaultRenderableObjects(1);
    // this.startGameLoop();
    this.redrawScreen();
  }

  startGameLoop() {
    this.gameLoop = setInterval(() => {
      this.oneGameLoop();
    }, 3000);
  }

  initializeDefaultRenderableObjects(numObjects: Number) {
    this.renderableObjects = [];
    // this.initializeParticles(1);
    this.initializeGridCells(this.mapGrid.grid, this.mapGrid.gridRows, this.mapGrid.gridCols);
  }

  initializeGridCells(grid: Grid2DCell[], totalRows: number, totalCols: number) {
    let x, y;
    for (let i = 0; i < grid.length; i++) {
      const cell = new BoxGeometry();
      cell.createVertexArrayObject(this.renderer.gl, this.renderer.basicShader);
      cell.setColor(this.setCellColor(grid[i].cellType));
      x = 25 * (i % totalCols);
      y = 25 * Math.floor(i / totalRows);
      cell.translate(new Vec3(x, y, 0));
      this.renderableObjects.push(cell);
    }
  }

  setCellColor(cellType: string): Vec4 {
    let color = new Vec4();
    switch (cellType) {
      case 'start':
        color = new Vec4(0, 1, 0, 1);
        break;
      case 'finish':
        color = new Vec4(1, 0, 0, 1);
        break;
      case 'blocked':
        color = new Vec4(0, 0, 0, 1);
        break;
      case 'open':
        color = new Vec4(.5, .5, .5, 1);
        break;
    }
    return color;
  }

  oneGameLoop() {
    // this.applyUserInput();
    this.redrawScreen();
  }

  redrawScreen() {
    this.renderableObjects.forEach((renderable) => {
      // this.printRenderableDebugInfo(renderable);
    });
    this.renderer.drawFrame(0, this.renderableObjects);
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
    // console.log(`# of Keys currently pressed ${this.activeKeysMap}`, this.activeKeysMap);
    console.log('End');
  }

  solveMaze() {

  }
}
