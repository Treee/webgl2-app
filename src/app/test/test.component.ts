import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { ShaderProgram } from '../shaders/shader-program';
import { ShaderProgramService } from '../services/shader-program/shader-program.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

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

    var positionAttributeLocation = this.gl.getAttribLocation(basicShader, 'a_position');
    var resolutionUniformLocation = this.gl.getUniformLocation(basicShader, 'u_resolution');
    var positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    // three 2d points
    var positions = [
      10, 20,
      80, 20,
      10, 30,
      10, 30,
      80, 20,
      80, 30,
    ];
    this.gl.enableVertexAttribArray(positionAttributeLocation);

    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);

    var vao = this.gl.createVertexArray();
    this.gl.bindVertexArray(vao);
    this.gl.enableVertexAttribArray(positionAttributeLocation);

    var size = 2;          // 2 components per iteration
    var type = this.gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
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

    var primitiveType = this.gl.TRIANGLES;
    var offset = 0;
    var count = 6;
    this.gl.drawArrays(primitiveType, offset, count);
  }
}