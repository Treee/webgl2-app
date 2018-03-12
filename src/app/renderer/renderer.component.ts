import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';
import { ShaderProgram } from '../shaders/shader-program';
import { ShaderProgramService } from '../services/shader-program/shader-program.service';
import { Geometry } from '../models/geometry';

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

    // Tell it to use our program (pair of shaders)
    this.gl.useProgram(basicShader);


    // set up attribute and uniforms
    const positionAttributeLocation = this.gl.getAttribLocation(basicShader, 'a_position');
    const resolutionUniformLocation = this.gl.getUniformLocation(basicShader, 'u_resolution');


    const shape = new Geometry();

    // make a buffer for position data
    const positionBuffer = this.gl.createBuffer();
    // bind the buffer to the gl context as an array type
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    // send data the the buffer as type of array. static draw means it doesnt change
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(shape.positions), this.gl.STATIC_DRAW);

    // make a vertex array (this is so we layer data in a single array)
    const vao = this.gl.createVertexArray();

    // bind to the vertex array we will buffer data to
    this.gl.bindVertexArray(vao);

    // enable an attribute that was created above (in this case, possition attrib)
    this.gl.enableVertexAttribArray(positionAttributeLocation);

    const size = 2;             // 2 components per iteration
    const type = this.gl.FLOAT; // the data is 32bit floats
    const normalize = false;    // don't normalize the data
    const stride = 0;           // 0 = move forward size * sizeof(type) each iteration to get the next position
    let offset = 0;             // start at the beginning of the buffer
    // define how the gpu will interpret the array
    this.gl.vertexAttribPointer(
      positionAttributeLocation, size, type, normalize, stride, offset);




    // Clear the canvas
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    // Pass in the canvas resolution so we can convert from pixels to clipspace in the shader
    this.gl.uniform2f(resolutionUniformLocation, this.gl.canvas.width, this.gl.canvas.height);

    offset = 0;
    const count = 6;
    this.gl.drawArrays(this.gl.TRIANGLES, offset, count);
  }
}
