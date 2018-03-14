import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';
import { ShaderProgram } from '../shaders/shader-program';
import { ShaderProgramService } from '../services/shader-program/shader-program.service';
import { Geometry2D } from '../models/geometry';

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

  constructor(private shaderService: ShaderProgramService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.initCanvas();
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

    // create the default shader program for a 2d program
    this.basicShaderProgram = new ShaderProgram(this.shaderService);
    const basicShader = this.basicShaderProgram.getBasic2dProgram(this.gl);

    const shape = new Geometry2D(this.gl, basicShader);

    this.drawFrame(0, this.gl, basicShader, [shape]);
  }

  drawFrame(dt: Number, gl: any, shaderProgram: WebGLProgram, renderableObjects: Geometry2D[]) {
    renderableObjects.forEach(renderable => {
      // Tell it to use our program (pair of shaders)
      gl.useProgram(shaderProgram);

      // set up attribute and uniforms (vertex shader)
      const positionAttributeLocation = this.gl.getAttribLocation(shaderProgram, 'a_position');
      const resolutionUniformLocation = gl.getUniformLocation(shaderProgram, 'u_resolution');
      // set up attribute and uniforms (fragment shader)
      const colorUniformLocation = gl.getUniformLocation(shaderProgram, 'u_color');

      gl.bindVertexArray(renderable.vao);

      // Pass in the canvas resolution so we can convert from pixels to clipspace in the shader
      gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
      // Set a random color.
      gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);

      let offset = 0;
      const count = 6;
      // Clear the canvas
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, offset, count);
    });
  }
}
