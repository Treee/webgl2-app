import { Component, ViewChild, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { RendererEngine } from 'tree-xyz-webgl2-engine';

import { Grid2D } from 'tree-xyz-webgl2-engine/dist/data-structures/grid-2d';
import { Grid2DCell } from 'tree-xyz-webgl2-engine/dist/data-structures/grid-2d-cell';
import { AStar } from 'tree-xyz-webgl2-engine/dist/algorithms/a-star';

import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';

@Component({
  selector: 'app-rts-map',
  templateUrl: './rts-map.component.html',
  styleUrls: ['./rts-map.component.css']
})
export class RtsMapComponent implements AfterViewInit {

  @ViewChild('glCanvas') canvasElement: ElementRef;

  mapGrid: Grid2D;
  pathFinder: AStar;

  pathSolution: Grid2DCell[] | any;
  currentSolutionCell = 0;
  currentDestinationIndex = 0;
  currentDestination: Grid2DCell;

  renderer: RendererEngine;

  width = 400;
  height = 400;

  dt = 150;

  gameLoop: any;

  constructor(private errorHandlerService: ErrorHandlerService) {
    this.renderer = new RendererEngine();
    this.pathFinder = new AStar();
    this.initializeGrid();
  }

  initializeGrid() {
    this.mapGrid = new Grid2D();
    // this.grid.initializeGrid(this.gridProperties.rows, this.gridProperties.cols);
    this.mapGrid.initializeGrid(10, 10);
    // this.grid.loadGrid(this.gridProperties.defaultMaze);
    this.mapGrid.loadGrid('oooboboooo\noooobbbboo\nobbobooooo\nooboobbobo\nboobbooobb\nbooooobooo\nbboooobbob\noobbbbooob\nbbooobboob\noboobooboo');
    this.mapGrid.connectGridCells();
    this.currentDestinationIndex = this.mapGrid.totalCells - 1;
    this.currentDestination = this.mapGrid.grid[this.currentDestinationIndex];
  }

  ngAfterViewInit() {
    this.renderer.initializeRenderer(this.canvasElement.nativeElement, this.width, this.height);
    this.startGameLoop();
  }

  startGameLoop() {
    this.gameLoop = setInterval(() => {
      this.oneGameLoop();
    }, this.dt);
  }

  setCellColor(cellType: string) {
  }

  oneGameLoop() {
    // this.applyUserInput();
    this.updateUnit(this.dt);
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

  updateUnit(dt: number) {
    if (this.pathSolution) {
      const destinationCell = this.pathSolution[this.currentSolutionCell];
      // console.log('gridCell', gridCell);
      // console.log('currentPosition', this.unit.getPosition());
      // console.log('destination', destination);
      // console.log('destinationCell', destinationCell);

      // console.log('new position', newPosition);

    }
  }

  areVectorsEqual() {
    return true;
  }

  onRightClick(event) {
    // console.log(`x:${event.layerX} y:${event.layerY}`, event);
    const gridIndex = this.translateXYtoGridIndex(event.layerX, event.layerY);
    console.log(`grid index ${gridIndex} with total cells ${this.mapGrid.totalCells}`);
    if (gridIndex < this.mapGrid.totalCells) {
      // set the current start cell to open

      // set the new start cell to start


      // set the current finish cell to open
      this.currentDestination.cellType = 'open';
      this.currentDestination = this.mapGrid.grid[gridIndex];
      // set the new finish cell to finish
      this.currentDestination.cellType = 'finish';
      this.currentDestinationIndex = gridIndex;

      this.pathSolution = null;
      this.currentSolutionCell = 0;
      this.solveMaze();
    }
    return false;
  }

  translateXYtoGridIndex(x: number, y: number): number {
    const cellWidthHeight = 25;
    const row = Math.floor(y / cellWidthHeight);
    const col = Math.floor(x / cellWidthHeight);
    console.log(`row:${row} col:${col}`);
    const gridIndex = this.mapGrid.gridCols * row + col;
    console.log(`grid index ${gridIndex} with total cells ${this.mapGrid.totalCells}`);
    return gridIndex;
  }

  resetMaze() {
    clearInterval(this.gameLoop);
  }
}
