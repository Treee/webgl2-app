import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Grid2D, Grid2DCell } from 'tree-xyz-webgl2-engine/dist/data-structures/grid-2d';


@Component({
  selector: 'app-path-finder',
  templateUrl: './path-finder.component.html',
  styleUrls: ['./path-finder.component.css']
})
export class PathFinderComponent implements OnInit, AfterViewInit {

  @ViewChild('gridCells') cells: ElementRef;
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

  ngAfterViewInit() {
    console.log(this.cells.nativeElement.children);
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
      console.log('solution cell', this.cells.nativeElement.children[cell.gridIndex].attributes);
      this.cells.nativeElement.children[cell.gridIndex].style = 'background-color: grey';
    });
    console.log('solution', solution);
  }

  onError(error) {
    console.log('error', error);
  }

  setStyles(cellType: string) {
    return {
      'background-color': this.getCellColor(cellType)
    };
  }

  getCellColor(cellType: string) {
    let cellColor = 'orange';
    if (!cellType) {
      cellColor = 'gray';
    } else if (cellType === 'blocked') {
      cellColor = 'black';
    } else if (cellType === 'start') {
      cellColor = 'green';
    } else if (cellType === 'finish') {
      cellColor = 'red';
    } else if (cellType === 'open') {
      cellColor = 'white';
    }
    return cellColor;
  }

}
