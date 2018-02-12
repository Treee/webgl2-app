import { IShader } from "./i-shader";
import { ShaderProgramService } from "../services/shader-program/shader-program.service";

export class VertextShader implements IShader {

    constructor(private shaderService: ShaderProgramService) {

    }

    getBasicShader(gl: WebGLRenderingContext): WebGLShader {
        return this.shaderService.compileShader(gl, this.getBasicShaderCode(), gl.VERTEX_SHADER);
    }

    getBasicShaderCode(): string {
        return `#version 300 es
 
        in vec4 a_position;
        //  uniform mat4 u_matrix;
         
        void main() {
           // gl_Positon = u_matrix * a_position;
           gl_Positon = a_position;
        }`;
    }
}
