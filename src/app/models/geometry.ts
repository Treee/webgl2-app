import { Vector2 } from 'three';

export class Geometry2D {

    public position: Vector2 = new Vector2(0, 0);

    public vertices: any[];

    public vao: any;

    constructor(width, height) {
        this.createRectangle(this.position, width, height);
    }

    randomInt(range) {
        return Math.floor(Math.random() * range);
    }

    createRectangle(position: THREE.Vector2, width: number, height: number) {
        this.position = position;
        const x1 = position.x;
        const x2 = x1 + width;
        const y1 = position.y;
        const y2 = y1 + height;
        this.vertices = [
            x1, y1,
            x2, y1,
            x1, y2,
            x1, y2,
            x2, y1,
            x2, y2
        ];
    }

    createRandomRectangle(maxX: number, maxY: number, maxWidth: number, maxHeight: number) {
        const x1 = this.randomInt(maxX);
        const x2 = x1 + this.randomInt(maxWidth);
        const y1 = this.randomInt(maxY);
        const y2 = y1 + this.randomInt(maxHeight);
        this.position.set(x1, y1);
        this.vertices = [
            x1, y1,
            x2, y1,
            x1, y2,
            x1, y2,
            x2, y1,
            x2, y2
        ];
    }

    createVertexArrayObject(gl: any, shaderProgram: WebGLProgram) {
        // set up attribute and uniforms (vertex shader)
        const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'a_position');

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
        const buffer = gl.createBuffer();
        gl.bindBuffer(bufferType, buffer);
        gl.bufferData(bufferType, new Float32Array(bufferData), bufferUsage);
    }
}

