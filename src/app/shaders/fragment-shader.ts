import { IShader } from "./i-shader";
import { ShaderProgramService } from "../services/shader-program/shader-program.service";

export class FragmentShader implements IShader {
    constructor(private shaderService: ShaderProgramService) {

    }

    getBasicShader(gl: WebGLRenderingContext): WebGLShader {
        return this.shaderService.compileShader(gl, this.getBasicShaderCode(), gl.FRAGMENT_SHADER);
    }

    getBasicShaderCode(): string {
        return `#version 300 es
 
        precision mediump float;
         
        out vec4 outColor;
         
        void main() {
          outColor = vec4(1, 0, 0.5, 1);
        }`;
    }

}
