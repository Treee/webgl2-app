import { Component, OnInit } from '@angular/core';
import { Grid2D, Grid2DCell } from 'tree-xyz-webgl2-engine/dist/data-structures/grid-2d';


@Component({
  selector: 'app-path-finder',
  templateUrl: './path-finder.component.html',
  styleUrls: ['./path-finder.component.css']
})
export class PathFinderComponent implements OnInit {

  gridMaze: Grid2D;

  gridProperties: any = {
    rows: 10,
    cols: 10,
    defaultMaze: 'soooxoooox\nxoxoxoxxox\nxooxxooxox\nxxoxxxoxox\nxooxoooxox\nxoxxoxxxox\nxoxxoxooox\noooooxoxoo\noxoxxxoxxx\noxooooooof'
  };

  constructor() {
    this.gridMaze = new Grid2D();
    this.initializeGrid();
  }

  ngOnInit() {
  }

  initializeGrid() {
    this.gridMaze.initializeGrid(this.gridProperties.rows, this.gridProperties.cols);
    this.gridMaze.loadGrid(this.gridProperties.defaultMaze);
    this.gridMaze.connectGridCells();
  }

  solveMaze() {
    const solution = this.gridMaze.aStar(this.gridMaze.startingPoint, this.gridMaze.finishingPoint);
    solution.reverse();
    solution.forEach((cell) => {
      this.gridMaze.grid[cell.gridIndex].setCellType('solution');
    });
    console.log('solution', solution);
  }

  onError(error) {
    console.log('error', error);
  }

}
