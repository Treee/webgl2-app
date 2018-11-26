import { Component, ViewChild, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { BoxGeometry, Point2D, Vec3, Vec4, RendererEngine } from 'tree-xyz-webgl2-engine';

import { Grid2D } from 'tree-xyz-webgl2-engine/dist/data-structures/grid-2d';
import { Grid2DCell } from 'tree-xyz-webgl2-engine/dist/data-structures/grid-2d-cell';
import { AStar } from 'tree-xyz-webgl2-engine/dist/algorithms/a-star';

import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { Vector3 } from 'three';

@Component({
  selector: 'app-rts-map',
  templateUrl: './rts-map.component.html',
  styleUrls: ['./rts-map.component.css']
})
export class RtsMapComponent implements AfterViewInit {

  @ViewChild('glCanvas') canvasElement: ElementRef;

  mapGrid: Grid2D;
  pathFinder: AStar;

  unit: BoxGeometry;

  pathSolution: Grid2DCell[] | any;
  currentSolutionCell = 0;

  renderableObjects: BoxGeometry[];

  renderer: RendererEngine;

  width = 400;
  height = 400;

  gameLoop: any;

  constructor(private errorHandlerService: ErrorHandlerService) {
    this.renderableObjects = [];
    this.renderer = new RendererEngine();
    this.pathFinder = new AStar();
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
    // this.initializeParticles(1);
    this.initializeGridCells(this.mapGrid.grid, this.mapGrid.gridRows, this.mapGrid.gridCols);
    this.unit = new BoxGeometry();
    this.unit.createVertexArrayObject(this.renderer.gl, this.renderer.basicShader);
    this.unit.setColor(new Vec4(0, 0, 1, 1));
    // this.unit.setScale(new Vec3(.25, .25, .25));
    this.renderableObjects.push(this.unit);
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
    this.updateUnit(60);
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
    const start = this.mapGrid.grid.find((cell) => {
      return cell.cellType === 'start';
    });

    if (!start) {
      this.errorHandlerService.error('There is no starting point.');
    }

    const destination = this.mapGrid.grid.find((cell) => {
      return cell.cellType === 'finish';
    });

    if (!destination) {
      this.errorHandlerService.error('There is no destination.');
    }
    const solution = this.pathFinder.findPath(start, destination, this.mapGrid.gridRows, this.mapGrid.gridCols);
    if (solution) {
      this.pathSolution = solution;
      this.pathSolution.reverse();
    } else {
      this.pathSolution = null;
    }
  }

  updateUnit(dt: number) {
    if (this.pathSolution) {
      let destinationCell = this.pathSolution[this.currentSolutionCell];
      let gridCell = this.renderableObjects[destinationCell.gridIndex];
      let destination = new Vec3(gridCell.x, gridCell.y, gridCell.z);
      if (this.areVectorsEqual(this.unit.getPosition(), destination)) {
        // move to the next cell
        console.log('moving to the next cell');
        console.log('gridCell', gridCell);
        console.log('currentPosition', this.unit.getPosition());
        console.log('destination', destination);
        console.log('destinationCell', destinationCell);
        this.currentSolutionCell++;
        destinationCell = this.pathSolution[this.currentSolutionCell];
        gridCell = this.renderableObjects[destinationCell.gridIndex];
        destination = gridCell.getPosition();
      }
      const newPosition = this.unit.lerp(this.unit.getPosition(), destination, 1);

      console.log('new position', newPosition);
      this.unit.translate(newPosition);

      if (destinationCell.cellType === 'finish') {
        this.pathSolution = null;
      }

    }
  }

  areVectorsEqual(a: Vec3, b: Vec3) {
    const vectorsAreEqual = (a.x === b.x && a.y === b.y && a.z === b.z);
    const distance = Math.sqrt(((a.x - b.x) * (a.x - b.x)) + ((a.y - b.y) * (a.y - b.y)) + ((a.z - b.z) * (a.z - b.z)));
    const vectorsAreBasicallyEqual = distance < 0;
    return vectorsAreEqual || vectorsAreBasicallyEqual;
  }
}
