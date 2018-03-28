import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';
import { ShaderProgram } from '../shaders/shader-program';
import { ShaderProgramService } from '../services/shader-program/shader-program.service';
import { Geometry2D } from '../models/geometry2d';
import { Matrix3, Vector2 } from 'three';
import { TextHelperService } from '../services/helpers/text-helper.service';

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
  projectionMatrix: Matrix3 = new Matrix3();
  userInput: any = {
    x: 0,
    y: 0
  };

  canvasScale: Vector2 = new Vector2();

  constructor(private shaderService: ShaderProgramService, private textHelperService: TextHelperService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.initCanvas();
    this.initializeShaderPrograms(this.gl);
    this.initializeDefaultRenderableObjects(this.gl, this.shaderProgramInfo.basicShader, 1);
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

    this.canvasScale.set(2 / this.gl.canvas.width, 2 / this.gl.canvas.height);

    // note the -2 for the height. this flips the axis so 0 is at the top
    this.projectionMatrix.set(
      2 / this.width, 0, 0,
      0, -2 / this.height, 0,
      -1, 1, 1
    );
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
      const geometry = new Geometry2D(10, 10, this.textHelperService, this.canvasScale);
      geometry.createVertexArrayObject(gl, shaderProgram);
      geometry.setColor(Math.random(), Math.random(), Math.random(), 1);
      //geometry.translate(i * 100, geometry.getPosition().y, 0);
      // geometry.translate(this.randomInt(this.width), this.randomInt(this.height));
      // geometry.rotate(this.randomInt(360));
      // geometry.setScale(this.randomInt(5), this.randomInt(5));
      geometry.transformGeometry(this.projectionMatrix);
      this.renderableObjects.push(geometry);
    }
  }

  randomInt(range) {
    return Math.floor(Math.random() * range);
  }

  saveInput(type: string) {
    this.renderableObjects.forEach(renderable => {
      if (type === 'translateX') {
        renderable.translate(this.userInput.x, renderable.getPosition().y, 0);
      } else if (type === 'translateY') {
        renderable.translate(renderable.getPosition().x, this.userInput.y, 0);
      }
      renderable.transformGeometry(this.projectionMatrix);
    });
    this.drawFrame(0, this.gl, this.shaderProgramInfo.basicShader, this.renderableObjects);
  }

  drawFrame(dt: Number, gl: any, shaderProgram: WebGLProgram, renderableObjects: Geometry2D[]) {
    let projectionMatrix = new Matrix3();
    // Tell it to use our program (pair of shaders)
    gl.useProgram(shaderProgram);

    // set up attribute and uniforms (vertex shader)    
    const transformUniformLocation = gl.getUniformLocation(shaderProgram, 'u_transform');
    // set up attribute and uniforms (fragment shader)
    const colorUniformLocation = gl.getUniformLocation(shaderProgram, 'u_color');

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    renderableObjects.forEach(renderable => {

      gl.bindVertexArray(renderable.vao);
      // vertex uniforms
      const matrix = renderable.getTransform();
      gl.uniformMatrix3fv(transformUniformLocation, false, matrix.transpose().toArray());
      // fragment uniforms
      gl.uniform4fv(colorUniformLocation, renderable.getColor().toArray());

      let offset = 0;
      const count = 18;
      gl.drawArrays(gl.TRIANGLES, offset, count);
    });
  }
}
