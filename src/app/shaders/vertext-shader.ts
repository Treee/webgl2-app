import { IShader } from './i-shader';
import { ShaderProgramService } from '../services/shader-program/shader-program.service';

export class VertextShader implements IShader {

    constructor(private shaderService: ShaderProgramService) {

    }

    getBasic2dShader(gl: WebGLRenderingContext): WebGLShader {
        // console.log('vertex shader', this.getBasicShaderCode());
        return this.shaderService.compileShader(gl, this.getBasic2dShaderCode(), gl.VERTEX_SHADER);
    }

    getBasicShader(gl: WebGLRenderingContext): WebGLShader {
        // console.log('vertex shader', this.getBasicShaderCode());
        return this.shaderService.compileShader(gl, this.getBasicShaderCode(), gl.VERTEX_SHADER);
    }

    private getBasic2dShaderCode(): string {
        return `#version 300 es
        in vec2 a_position;

        uniform vec2 u_resolution;

        void main() {
          // convert the position from pixels to 0.0 to 1.0
          vec2 zeroToOne = a_position / u_resolution;

          // convert from 0->1 to 0->2
          vec2 zeroToTwo = zeroToOne * 2.0;

          // convert from 0->2 to -1->+1 (clipspace)
          vec2 clipSpace = zeroToTwo - 1.0;

          gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
        }
        `;
    }

    private getBasicShaderCode(): string {
        return `#version 300 es

        in vec4 a_position;

        void main() {
          gl_Position = a_position;
        }
        `;
    }
}
