import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';

import { RendererEngine } from 'tree-xyz-webgl2-engine';

@Component({
  selector: 'app-playground-3d',
  templateUrl: './playground-3d.component.html',
  styleUrls: ['./playground-3d.component.css']
})
export class Playground3dComponent implements AfterViewInit {

  @ViewChild('glCanvas') canvasElement: ElementRef;
  width = 1366;
  height = 768;

  renderer: RendererEngine;

  deltaTime: number = 0;

  sixtyFrames: number = 1000 / 60;
  fourtyFiveFrames: number = 1000 / 45;
  thirtyFrames: number = 1000 / 30;

  activeKeysMap = {};

  constructor() {
    this.renderer = new RendererEngine();
  }

  ngAfterViewInit() {
    this.renderer.initializeRenderer(this.canvasElement.nativeElement, this.width, this.height);
    setInterval(() => {
      this.deltaTime = this.deltaTime + this.sixtyFrames;
      this.renderer.applyUserInput(this.activeKeysMap);
      this.renderer.drawScene(this.renderer.gl, this.deltaTime);
    }, this.sixtyFrames);
  }


  @HostListener('document:keydown', ['$event'])
  @HostListener('document:keyup', ['$event'])
  userKeyPress(event) {
    this.activeKeysMap[event.key] = (event.type === 'keydown');
  }
}
