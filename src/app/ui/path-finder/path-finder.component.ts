import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Grid2D } from 'tree-xyz-webgl2-engine/dist/data-structures/grid-2d';
import { Grid2DCell } from 'tree-xyz-webgl2-engine/dist/data-structures/grid-2d-cell';
import { AStar } from 'tree-xyz-webgl2-engine/dist/algorithms/a-star';

import { ErrorHandlerService } from '../../services/error-handler/error-handler.service';

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

  currentlySelectedTemplate = -1;
  templates = [
    { name: 'default', rows: 5, cols: 5, gridString: 'ooobo\nobobo\nooooo\nbobbb\nooooo' },
  ];

  gridProperties: any = {
    rows: 10,
    cols: 10,
    drawSpeed: 250,
    currentMazeEditorBrush: 'none',
    autoDrawSolution: true,
    hasSolution: false,
    isDrawing: false,
    startingCell: null,
    destinationCell: null
  };

  constructor(private errorHandlerService: ErrorHandlerService) {
    this.resetMaze();
    this.loadLocalData();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  setEditorMazeBrush(brushType: string) {
    this.gridProperties.currentMazeEditorBrush = brushType;
  }

  selectTemplate(index) {
    this.currentlySelectedTemplate = index;
    console.log('selected template', this.templates[index]);
  }

  loadMaze() {
    this.resetDisplaySteps();
    this.gridMaze = new Grid2D();
    this.pathFinder = new AStar();
    this.gridMaze.initializeGrid(this.templates[this.currentlySelectedTemplate].rows, this.templates[this.currentlySelectedTemplate].cols);
    this.gridMaze.loadGrid(this.templates[this.currentlySelectedTemplate].gridString);
    this.gridMaze.connectGridCells();

    this.gridProperties.rows = this.templates[this.currentlySelectedTemplate].rows;
    this.gridProperties.cols = this.templates[this.currentlySelectedTemplate].cols;
    this.gridProperties.drawSpeed = 250;
    this.gridProperties.currentMazeEditorBrush = 'none';
    this.gridProperties.hasSolution = false;
    this.gridProperties.isDrawing = false;
    this.gridProperties.startingCell = null;
    this.gridProperties.destinationCell = null;
  }

  saveMaze() {
    const mazeName = `Maze #:${Math.random()}`;
    const mazeGridString = this.gridMaze.serializeGrid();
    // tslint:disable-next-line:max-line-length
    this.templates.push({ name: mazeName, rows: mazeGridString.gridRows, cols: mazeGridString.gridCols, gridString: mazeGridString.gridString });
    this.saveDataLocally();
  }

  deleteMaze() {
    this.templates.splice(this.currentlySelectedTemplate, 1);
    this.clearSelection();
    this.saveDataLocally();
  }

  saveDataLocally() {
    localStorage.setItem('saved-templates', JSON.stringify(this.templates));
  }

  loadLocalData() {
    this.templates = JSON.parse(localStorage.getItem('saved-templates')) || [];
  }

  setStart(event) {
    // set the new starting cell
    return false;
  }

  setDestination(event) {
    // set the new destination cell
    return false;
  }

  startDraw(event) {
    this.gridProperties.isDrawing = true;
    return false;
  }

  stopDraw(event) {
    this.gridProperties.isDrawing = false;
    return false;
  }

  getNotification(event) {
    console.log('event', event);
    if (event.message === 'clear-start') {
      // console.log('need to clear', this.gridProperties.startingCell);
      if (this.gridProperties.startingCell) {
        this.gridProperties.startingCell.cellType = 'open';
      }
      this.gridProperties.startingCell = null;
    } else if (event.message === 'clear-finish') {
      // console.log('need to clear', this.gridProperties.destinationCell);
      if (this.gridProperties.destinationCell) {
        this.gridProperties.destinationCell.cellType = 'open';
      }
      this.gridProperties.destinationCell = null;
    } else if (event.message === 'set-start') {
      this.gridProperties.startingCell = event.cell;
    } else if (event.message === 'set-finish') {
      this.gridProperties.destinationCell = event.cell;
    }
  }

  initializeGrid() {
    this.gridMaze.initializeGrid(this.gridProperties.rows, this.gridProperties.cols);
    // this.gridMaze.loadGrid(this.gridProperties.defaultMaze);
    this.gridMaze.connectGridCells();
  }

  solveMaze() {
    this.resetDisplaySteps();
    if (!this.gridProperties.startingCell) {
      this.errorHandlerService.error('There is no starting point.');
    }

    if (!this.gridProperties.destinationCell) {
      this.errorHandlerService.error('There is no destination.');
    }

    if (this.gridProperties.startingCell && this.gridProperties.destinationCell) {
      // tslint:disable-next-line:max-line-length
      const solution = this.pathFinder.findPath(this.gridProperties.startingCell, this.gridProperties.destinationCell, this.gridProperties.rows, this.gridProperties.cols);
      if (solution) {
        this.gridProperties.hasSolution = true;
        this.gridSolution = solution;
        if (this.gridProperties.autoDrawSolution) {
          this.displaySteps();
        } else {
          this.errorHandlerService.success('Solution found for this maze.');
        }
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

  clearSelection() {
    this.currentlySelectedTemplate = -1;
  }

  resetMaze() {
    this.resetDisplaySteps();
    this.gridMaze = new Grid2D();
    this.pathFinder = new AStar();
    this.initializeGrid();

    this.gridProperties.rows = 10;
    this.gridProperties.cols = 10;
    this.gridProperties.drawSpeed = 250;
    this.gridProperties.currentMazeEditorBrush = 'none';
    this.gridProperties.hasSolution = false;
    this.gridProperties.isDrawing = false;
    this.gridProperties.startingCell = null;
    this.gridProperties.destinationCell = null;
    this.clearSelection();
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
