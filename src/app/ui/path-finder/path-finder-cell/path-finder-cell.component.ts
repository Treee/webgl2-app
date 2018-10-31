import { Component, OnInit, Input } from '@angular/core';
import { Grid2DCell } from 'tree-xyz-webgl2-engine/dist/data-structures/grid-2d';

@Component({
  selector: 'app-path-finder-cell',
  templateUrl: './path-finder-cell.component.html',
  styleUrls: ['./path-finder-cell.component.css']
})
export class PathFinderCellComponent implements OnInit {

  @Input('gridCell') gridCell: Grid2DCell;

  constructor() { }

  ngOnInit() {

  }

  setStyles() {
    return {
      'background-color': this.getCellColor()
    };
  }

  getCellColor() {
    let cellColor = 'orange';
    if (!this.gridCell) {
      cellColor = 'gray';
    } else if (this.gridCell.cellType === 'blocked') {
      cellColor = 'black';
    } else if (this.gridCell.cellType === 'start') {
      cellColor = 'green';
    } else if (this.gridCell.cellType === 'finish') {
      cellColor = 'red';
    } else if (this.gridCell.cellType === 'open') {
      cellColor = 'white';
    } else if (this.gridCell.cellType === 'solution') {
      cellColor = 'gray';
    }
    return cellColor;
  }

}
