import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';
import { ShaderProgram } from '../shaders/shader-program';
import { ShaderProgramService } from '../services/shader-program/shader-program.service';

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
    const canvasEl: HTMLCanvasElement = this.canvasRef.nativeElement;
    this.gl = canvasEl.getContext('webgl2') as any;
    if (!this.gl) {
      return -1;
    }
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.basicShaderProgram = new ShaderProgram(this.shaderService);
    const basicShader = this.basicShaderProgram.getBasic2dProgram(this.gl);

    const positionAttributeLocation = this.gl.getAttribLocation(basicShader, 'a_position');
    const resolutionUniformLocation = this.gl.getUniformLocation(basicShader, 'u_resolution');
    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    // three 2d points
    const positions = [
      10, 20,
      80, 20,
      10, 30,
      10, 30,
      80, 20,
      80, 30,
    ];
    this.gl.enableVertexAttribArray(positionAttributeLocation);

    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);

    const vao = this.gl.createVertexArray();
    this.gl.bindVertexArray(vao);
    this.gl.enableVertexAttribArray(positionAttributeLocation);

    const size = 2;          // 2 components per iteration
    const type = this.gl.FLOAT;   // the data is 32bit floats
    const normalize = false; // don't normalize the data
    const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    let offset = 0;        // start at the beginning of the buffer
    this.gl.vertexAttribPointer(
      positionAttributeLocation, size, type, normalize, stride, offset);


    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    // Clear the canvas
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    this.gl.useProgram(basicShader);

    // Bind the attribute/buffer set we want.
    this.gl.bindVertexArray(vao);

    // Pass in the canvas resolution so we can convert from
    // pixels to clipspace in the shader
    this.gl.uniform2f(resolutionUniformLocation, this.gl.canvas.width, this.gl.canvas.height);

    const primitiveType = this.gl.TRIANGLES;
    offset = 0;
    const count = 6;
    this.gl.drawArrays(primitiveType, offset, count);
  }
}
