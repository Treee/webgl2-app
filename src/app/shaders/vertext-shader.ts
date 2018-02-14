import { IShader } from "./i-shader";
import { ShaderProgramService } from "../services/shader-program/shader-program.service";

export class VertextShader implements IShader {

    constructor(private shaderService: ShaderProgramService) {

    }

    getBasicShader(gl: WebGLRenderingContext): WebGLShader {
        // console.log('vertex shader', this.getBasicShaderCode());
        return this.shaderService.compileShader(gl, this.getBasicShaderCode(), gl.VERTEX_SHADER);
    }

    getBasicShaderCode(): string {
        return `#version 300 es

        in vec4 a_position;
        
        void main() {
          gl_Position = a_position;
        }
        `;
    }
}
