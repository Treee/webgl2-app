import { Component, OnInit } from '@angular/core';
import { Grid2D } from 'tree-xyz-webgl2-engine/dist/data-structures/grid-2d';


@Component({
  selector: 'app-path-finder',
  templateUrl: './path-finder.component.html',
  styleUrls: ['./path-finder.component.css']
})
export class PathFinderComponent implements OnInit {

  gridMaze: Grid2D;

  gridProperties: any = {
    rows: 10,
    cols: 10
  };

  constructor() {
    this.gridMaze = new Grid2D();
    this.initializeGrid();
  }

  ngOnInit() {
  }

  initializeGrid() {
    this.gridMaze.initializeGrid(this.gridProperties.rows, this.gridProperties.cols);
    this.gridMaze.connectGridCells();
  }

}
