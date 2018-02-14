import { ShaderProgramService } from "../services/shader-program/shader-program.service";
import { VertextShader } from "./vertext-shader";
import { FragmentShader } from "./fragment-shader";

export class ShaderProgram {
    constructor(private shaderService: ShaderProgramService) {

    }

    getBasic2dProgram(gl: WebGLRenderingContext): WebGLProgram {
        var basicVertexShader = new VertextShader(this.shaderService);
        var basicFragmentShader = new FragmentShader(this.shaderService);
        return this.shaderService.createProgram(gl, basicVertexShader.getBasic2dShader(gl), basicFragmentShader.getBasicShader(gl));
    }

    getBasicProgram(gl: WebGLRenderingContext): WebGLProgram {
        var basicVertexShader = new VertextShader(this.shaderService);
        var basicFragmentShader = new FragmentShader(this.shaderService);
        return this.shaderService.createProgram(gl, basicVertexShader.getBasicShader(gl), basicFragmentShader.getBasicShader(gl));
    }


}
