import * as THREE from 'three'

export class Geometry2D {

    public position: THREE.Vector2;

    public vertices: any[];

    public vao: any;

    constructor(gl: any, shaderProgram: WebGLProgram) {
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
        this.createVertexArrayObject(gl, shaderProgram);
    }

    createVertexArrayObject(gl: any, shaderProgram: WebGLProgram) {
        // set up attribute and uniforms (vertex shader)
        const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'a_position');
        const resolutionUniformLocation = gl.getUniformLocation(shaderProgram, 'u_resolution');
        // set up attribute and uniforms (fragment shader)
        const colorUniformLocation = gl.getUniformLocation(shaderProgram, 'u_color');

        // make a vertex array (this is so we layer data in a single array)
        this.vao = gl.createVertexArray();

        // bind to the vertex array we will buffer data to
        gl.bindVertexArray(this.vao);

        // enable an attribute that was created above (in this case, possition attrib)
        gl.enableVertexAttribArray(positionAttributeLocation);

        this.createBindAndBufferData(gl, gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

        const size = 2;             // 2 components per iteration
        const type = gl.FLOAT; // the data is 32bit floats
        const normalize = false;    // don't normalize the data
        const stride = 0;           // 0 = move forward size * sizeof(type) each iteration to get the next position
        let offset = 0;             // start at the beginning of the buffer
        // define how the gpu will interpret the array
        gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
        gl.bindVertexArray(null);
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

