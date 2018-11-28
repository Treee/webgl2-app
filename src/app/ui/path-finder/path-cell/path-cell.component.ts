import { Component, OnInit, Input, DoCheck, KeyValueDiffers, Output, EventEmitter } from '@angular/core';
import { Grid2DCell } from 'tree-xyz-webgl2-engine/dist/data-structures/grid-2d-cell';

@Component({
  selector: 'app-path-cell',
  templateUrl: './path-cell.component.html',
  styleUrls: ['./path-cell.component.css']
})
export class PathCellComponent implements OnInit, DoCheck {

  @Input() pathCell: Grid2DCell;
  @Input() currentMazeEditorBrush: string;
  @Input() isDrawing: boolean;

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  cellBackgroundColor = 'orange'; // default to orange
  differences: any;

  constructor(differs: KeyValueDiffers) {
    this.differences = differs.find({}).create();
  }

  ngOnInit() {
  }

  ngDoCheck() {
    const changes = this.differences.diff(this.pathCell);
    if (changes) {
      // console.log('test', changes);
      this.setCellColor();
    }
  }

  cellClicked() {
    // emit an event that this cell was clicked
    this.notifyParent.emit({ message: 'clear-start' });
    this.pathCell.cellType = 'start';
    const message = {
      message: 'set-start',
      cell: this.pathCell
    };
    this.notifyParent.emit(message);
  }

  rightClicked() {
    // emit an event that this cell was clicked
    this.notifyParent.emit({ message: 'clear-finish' });
    this.pathCell.cellType = 'finish';
    const message = {
      message: 'set-finish',
      cell: this.pathCell
    };
    this.notifyParent.emit(message);
  }

  cellDown() {
    if (this.currentMazeEditorBrush !== 'none') {
      this.pathCell.cellType = this.currentMazeEditorBrush;
      // console.log('i was clicked!!', this.pathCell);
    }
    return false;
  }

  cellEntered() {
    if (this.isDrawing && this.currentMazeEditorBrush !== 'none') {
      this.pathCell.cellType = this.currentMazeEditorBrush;
      // console.log('i was clicked!!', this.pathCell);
    }
    return false;
  }

  setCellColor() {
    if (!this.pathCell.cellType) {
      this.cellBackgroundColor = 'gray';
    } else if (this.pathCell.cellType === 'blocked') {
      this.cellBackgroundColor = 'black';
    } else if (this.pathCell.cellType === 'start') {
      this.cellBackgroundColor = 'green';
    } else if (this.pathCell.cellType === 'finish') {
      this.cellBackgroundColor = 'red';
    } else if (this.pathCell.cellType === 'open') {
      this.cellBackgroundColor = 'white';
    }
    if (this.pathCell['isSolution']) {
      this.cellBackgroundColor = 'green';
    }
    // console.log('cell color', this.cellBackgroundColor);
  }

}
