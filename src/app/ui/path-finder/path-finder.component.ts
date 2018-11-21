import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Grid2D } from 'tree-xyz-webgl2-engine/dist/data-structures/grid-2d';
import { Grid2DCell } from 'tree-xyz-webgl2-engine/dist/data-structures/grid-2d-cell';
import { AStar } from 'tree-xyz-webgl2-engine/dist/algorithms/a-star';

import { ErrorHandlerService } from '../../services/error-handler/error-handler.service';
import { Alert } from '../../services/error-handler/alert';

@Component({
  selector: 'app-path-finder',
  templateUrl: './path-finder.component.html',
  styleUrls: ['./path-finder.component.css']
})
export class PathFinderComponent implements OnInit, AfterViewInit {

  gridMaze: Grid2D;
  pathFinder: AStar;
  visualDisplaySteps = [];
  gridSolution: Grid2DCell[] | any = [];

  gridProperties: any = {
    rows: 10,
    cols: 10,
    drawSpeed: 250,
    currentMazeEditorBrush: 'none',
    hasSolution: false,
    isDrawing: false
  };

  constructor(private errorHandlerService: ErrorHandlerService) {
    this.resetMaze();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  setEditorMazeBrush(brushType: string) {
    this.gridProperties.currentMazeEditorBrush = brushType;
  }

  startDraw() {
    this.gridProperties.isDrawing = true;
  }

  stopDraw() {
    this.gridProperties.isDrawing = false;
  }

  initializeGrid() {
    this.gridMaze.initializeGrid(this.gridProperties.rows, this.gridProperties.cols);
    // this.gridMaze.loadGrid(this.gridProperties.defaultMaze);
    this.gridMaze.connectGridCells();
  }

  solveMaze() {

    const start = this.gridMaze.grid.find((cell) => {
      return cell.cellType === 'start';
    });

    if (!start) {
      this.errorHandlerService.error('There is no starting point.');
    }

    const destination = this.gridMaze.grid.find((cell) => {
      return cell.cellType === 'finish';
    });

    if (!destination) {
      this.errorHandlerService.error('There is no destination.');
    }

    if (start && destination) {
      const solution = this.pathFinder.findPath(start, destination, this.gridProperties.rows, this.gridProperties.cols);
      if (solution) {
        this.gridProperties.hasSolution = true;
        this.gridSolution = solution;
        this.errorHandlerService.success('Solution found for this maze.');
      } else {
        this.gridProperties.hasSolution = false;
        this.errorHandlerService.error('This maze has no solution.');
      }
    }
  }

  displayStepVisually(cell: Grid2DCell, index) {
    ((_index) => {
      const timeoutHandle = setTimeout(() => {
        // console.log('displaying cell with draw speed: ' + this.gridProperties.drawSpeed, cell);
        cell['isSolution'] = true;
      }, (this.gridProperties.drawSpeed * _index));
      this.visualDisplaySteps.push(timeoutHandle);
    })(index);
  }

  displaySteps() {
    if (this.gridProperties.hasSolution && this.gridSolution) {
      this.gridSolution.reverse();
      this.gridSolution.forEach((cell, index) => {
        this.displayStepVisually(cell, index);
      });
      console.log('solution', this.gridSolution);
    }
  }

  resetMaze() {
    this.resetDisplaySteps();
    this.gridMaze = new Grid2D();
    this.pathFinder = new AStar();
    this.initializeGrid();
  }

  resetDisplaySteps() {
    this.resetTimeouts();
    this.gridSolution.forEach((cell) => {
      delete cell['isSolution'];
    });
    this.gridSolution = [];
  }

  resetTimeouts() {
    this.visualDisplaySteps.forEach((handle) => {
      // console.log('stopping timeout', handle);
      clearTimeout(handle);
    });
  }

  onError(error) {
    console.log('error', error);
  }
}
