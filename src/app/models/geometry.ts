import * as THREE from 'three'

export class Geometry2D {

    public position: THREE.Vector2;

    public vertices: any[];

    constructor(gl: any) {
        this.position = new THREE.Vector2(0, 0);
        this.vertices = [
            10, 20,
            80, 20,
            10, 30,
            10, 30,
            80, 20,
            80, 30,
        ];

        // [0, 10, 70, 10, 0, 20, 0, 20, 70, 10, 70, 20]

        this.createBindAndBufferData(gl, gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
    }

    // create a buffer, bing opengl to that buffer, send data to the buffer in one fell swoop
    createBindAndBufferData(gl: any, bufferType: GLenum, bufferData, bufferUsage: GLenum) {
        const buffer = this.createBuffer(gl);
        this.bindBuffer(gl, bufferType, buffer);
        this.bufferData(gl, bufferType, new Float32Array(bufferData), bufferUsage);
    }

    // this only needs to be called once per buffer on initialization
    private createBuffer(gl: any): WebGLBuffer {
        return gl.createBuffer();
    }

    // tell opengl to bind to the given buffer
    private bindBuffer(gl: any, bufferType: GLenum, bufferToBind: WebGLBuffer) {
        gl.bindBuffer(bufferType, bufferToBind);
    }

    // send data to the bound buffer
    private bufferData(gl: any, bufferType: GLenum, bufferShape: ArrayBufferView, bufferUsage: GLenum) {
        gl.bufferData(bufferType, bufferShape, bufferUsage);
    }
}

