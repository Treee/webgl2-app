import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';
import { ShaderProgram } from '../shaders/shader-program';
import { ShaderProgramService } from '../services/shader-program/shader-program.service';
import { Geometry2D } from '../models/geometry';
import { Matrix3 } from 'three';

@Component({
  selector: 'app-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.css']
})
export class RendererComponent implements OnInit, AfterViewInit {

  @ViewChild('myCanvas') canvasRef: ElementRef;

  @Input() public width = 400;
  @Input() public height = 400;

  gl: any;
  basicShaderProgram: ShaderProgram;
  shaderProgramInfo: any = {};
  renderableObjects: Geometry2D[];

  constructor(private shaderService: ShaderProgramService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.initCanvas();
    this.initializeShaderPrograms(this.gl);
    this.initializeDefaultRenderableObjects(this.gl, this.shaderProgramInfo.basicShader, 2);
    this.drawFrame(0, this.gl, this.shaderProgramInfo.basicShader, this.renderableObjects);
  }

  initCanvas() {
    // get the canvas from the html
    const canvasEl: HTMLCanvasElement = this.canvasRef.nativeElement;

    // get the webgl 2 context
    this.gl = canvasEl.getContext('webgl2') as any;
    if (!this.gl) {
      return -1;
    }

    // set the width and height of the canvas
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    // set the viewport for the renderer
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
  }

  initializeShaderPrograms(gl: any) {
    // create the default shader program for a 2d program
    this.basicShaderProgram = new ShaderProgram(this.shaderService);
    this.shaderProgramInfo.basicShader = this.basicShaderProgram.getBasic2dProgram(gl);
  }

  initializeDefaultRenderableObjects(gl: any, shaderProgram: WebGLProgram, numObjects: Number) {
    this.renderableObjects = [];
    for (let i = 0; i < numObjects; i++) {
      const geometry = new Geometry2D(10, 10);
      geometry.createVertexArrayObject(gl, shaderProgram);
      geometry.translate(i * 100, geometry.getPosition().y);
      // geometry.translate(this.randomInt(this.width), this.randomInt(this.height));
      // geometry.rotate(this.randomInt(360));
      // geometry.setScale(this.randomInt(5), this.randomInt(5));
      geometry.transformGeometry();
      this.renderableObjects.push(geometry);
    }
  }

  randomInt(range) {
    return Math.floor(Math.random() * range);
  }

  drawFrame(dt: Number, gl: any, shaderProgram: WebGLProgram, renderableObjects: Geometry2D[]) {
    let projectionMatrix = new Matrix3();
    // Tell it to use our program (pair of shaders)
    gl.useProgram(shaderProgram);

    // set up attribute and uniforms (vertex shader)
    const resolutionUniformLocation = gl.getUniformLocation(shaderProgram, 'u_resolution');
    const transformUniformLocation = gl.getUniformLocation(shaderProgram, 'u_transform');
    // set up attribute and uniforms (fragment shader)
    const colorUniformLocation = gl.getUniformLocation(shaderProgram, 'u_color');

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    renderableObjects.forEach(renderable => {

      gl.bindVertexArray(renderable.vao);
      // vertex uniforms
      gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
      gl.uniformMatrix3fv(transformUniformLocation, false, renderable.getTransform().toArray());
      // fragment uniforms
      gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);

      let offset = 0;
      const count = 18;
      gl.drawArrays(gl.TRIANGLES, offset, count);
    });
  }
}
