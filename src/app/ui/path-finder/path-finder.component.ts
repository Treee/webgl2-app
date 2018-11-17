import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Grid2D, Grid2DCell } from 'tree-xyz-webgl2-engine/dist/data-structures/grid-2d';

// import { PathCellComponent } from './path-cell/path-cell.component';

@Component({
  selector: 'app-path-finder',
  templateUrl: './path-finder.component.html',
  styleUrls: ['./path-finder.component.css']
})
export class PathFinderComponent implements OnInit, AfterViewInit {

  gridMaze: Grid2D;
  visualDisplaySteps = [];

  gridProperties: any = {
    rows: 10,
    cols: 10,
    drawSpeed: 250,
    currentMazeEditorBrush: 'none'
  };

  constructor() {
    this.resetMaze();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  setEditorMazeBrush(brushType: string) {
    this.gridProperties.currentMazeEditorBrush = brushType;
  }

  initializeGrid() {
    this.gridMaze.initializeGrid(this.gridProperties.rows, this.gridProperties.cols);
    // this.gridMaze.loadGrid(this.gridProperties.defaultMaze);
    this.gridMaze.connectGridCells();
  }

  solveMaze() {
    const solution = this.gridMaze.aStar(this.gridMaze.startingPoint, this.gridMaze.finishingPoint);
    solution.reverse();
    solution.forEach((cell, index) => {
      // cell['isSolution'] = true;
      this.displayStepVisually(cell, index);
    });
    console.log('solution', solution);
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

  resetMaze() {
    this.resetTimeouts();
    this.gridMaze = new Grid2D();
    this.initializeGrid();
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
