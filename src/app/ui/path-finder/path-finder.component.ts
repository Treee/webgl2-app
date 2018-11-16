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

  gridProperties: any = {
    rows: 10,
    cols: 10,
    defaultMaze: 'soooxoooox\nxoxoxoxxox\nxooxxooxox\nxxoxxxoxox\nxooxoooxox\nxoxxoxxxox\nxoxxoxooox\noooooxoxoo\noxoxxxoxxx\noxooooooof'
  };

  constructor() {
    this.resetMaze();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  initializeGrid() {
    this.gridMaze.initializeGrid(this.gridProperties.rows, this.gridProperties.cols);
    this.gridMaze.loadGrid(this.gridProperties.defaultMaze);
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
      setTimeout(() => {
        console.log('displaying cell', cell);
        cell['isSolution'] = true;
      }, (500 * _index));
    })(index);
  }

  resetMaze() {
    this.gridMaze = new Grid2D();
    this.initializeGrid();
  }

  onError(error) {
    console.log('error', error);
  }
}
