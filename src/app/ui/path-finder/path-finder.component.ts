import { Component, OnInit } from '@angular/core';
import { Grid2D } from 'tree-xyz-webgl2-engine/dist/data-structures/grid-2d';


@Component({
  selector: 'app-path-finder',
  templateUrl: './path-finder.component.html',
  styleUrls: ['./path-finder.component.css']
})
export class PathFinderComponent implements OnInit {

  grid: Grid2D;

  constructor() { }

  ngOnInit() {
  }

}
