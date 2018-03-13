import { IShader } from './i-shader';
import { ShaderProgramService } from '../services/shader-program/shader-program.service';

export class FragmentShader implements IShader {
    constructor(private shaderService: ShaderProgramService) {

    }

    getBasicShader(gl: WebGLRenderingContext): WebGLShader {
        // console.log('fragmet shader', this.getBasicShaderCode());
        return this.shaderService.compileShader(gl, this.getBasicShaderCode(), gl.FRAGMENT_SHADER);
    }

    getBasicShaderCode(): string {
        return `#version 300 es

        precision mediump float;

        uniform vec4 u_color;

        out vec4 outColor;

        void main() {
          outColor = u_color;
        }`;
    }

}
