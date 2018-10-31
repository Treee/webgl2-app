import { Component, OnInit, Input } from '@angular/core';
import { Grid2DCell } from 'tree-xyz-webgl2-engine/dist/data-structures/grid-2d';

@Component({
  selector: 'app-path-finder-cell',
  templateUrl: './path-finder-cell.component.html',
  styleUrls: ['./path-finder-cell.component.css']
})
export class PathFinderCellComponent implements OnInit {

  @Input('gridCell') gridCell: Grid2DCell;

  cellColor = 'gray';

  constructor() { }

  ngOnInit() {
    if (this.gridCell) {
      this.setCellColor(this.gridCell.cellType);
    }
  }

  setCellColor(cellType: string) {
    if (cellType === 'blocked') {
      this.cellColor = 'black';
    } else if (cellType === 'start') {
      this.cellColor = 'green';
    } else if (cellType === 'finish') {
      this.cellColor = 'red';
    } else if (cellType === 'open') {
      this.cellColor = 'white';
    }
  }

}
