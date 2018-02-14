import { ShaderProgramService } from "../services/shader-program/shader-program.service";
import { VertextShader } from "./vertext-shader";
import { FragmentShader } from "./fragment-shader";

export class ShaderProgram {
    constructor(private shaderService: ShaderProgramService) {

    }

    getBasicProgram(gl: WebGLRenderingContext): WebGLProgram {
        var basicVertexShader = new VertextShader(this.shaderService);
        var basicFragmentShader = new FragmentShader(this.shaderService);
        return this.shaderService.createProgram(gl, basicVertexShader.getBasicShader(gl), basicFragmentShader.getBasicShader(gl));
    }


}
