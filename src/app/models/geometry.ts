import { Vector2, Vector3, Vector4, Matrix3 } from 'three';

export class Geometry2D {


    private transform: Matrix3 = new Matrix3();

    private position: Vector2 = new Vector2(0, 0);
    private translationMatrix: Matrix3 = new Matrix3();

    private rotation: Vector2 = new Vector2(0, 1);
    private rotationMaxtrix: Matrix3 = new Matrix3();

    private scale: Vector2 = new Vector2(1, 1);
    private scaleMatrix: Matrix3 = new Matrix3();

    private color: Vector4 = new Vector4(0, 0, 0, 1);

    public vertices: any[];

    public vao: any;

    constructor(width, height) {
        this.createF(this.getPosition());
        // this.createRectangle(this.position, width, height);
    }

    getTransform(): Matrix3 {
        return this.transform;
    }

    transformGeometry(projectionMatrix: Matrix3) {
        this.transform.identity();
        //this.transform = this.transform.multiply(projectionMatrix);
        this.transform = this.transform.multiply(this.translationMatrix);
        this.transform = this.transform.multiply(this.scaleMatrix);
        this.transform = this.transform.multiply(this.rotationMaxtrix);
        console.log(`Transform Geometry ${this.transform.toArray()}`)
    }

    setColor(red: number, green: number, blue: number, alpha: number) {
        this.color.set(red, green, blue, alpha);
    }

    getColor(): Vector4 {
        return this.color;
    }

    getPosition(): Vector2 {
        return this.position;
    }

    getTranslationMatrix(): Matrix3 {
        return this.translationMatrix;
    }

    translate(x: number, y: number) {
        console.log(`Translated from (${this.getPosition().x},${this.getPosition().y}) to (${x}, ${y})`);
        this.position.set(x, y);
        this.translationMatrix.set(
            1, 0, 0,
            0, 1, 0,
            x, y, 1);
    }

    getRotation(): Vector2 {
        return this.rotation;
    }

    getRotationMatrix(): Matrix3 {
        return this.rotationMaxtrix;
    }

    rotate(angleInDegrees: number) {
        console.log(`Rotated from (${this.getRotation().x},${this.getRotation().y}) by ${angleInDegrees} degrees`);
        const angleInRadians = angleInDegrees * (Math.PI / 180);
        const x = Math.sin(angleInRadians);
        const y = Math.cos(angleInRadians);
        this.rotation.set(x, y);
        this.rotationMaxtrix.set(
            y, -x, 0,
            x, y, 0,
            0, 0, 1
        );
    }

    getScale(): Vector2 {
        return this.scale;
    }

    getScaleMatrix(): Matrix3 {
        return this.scaleMatrix;
    }

    setScale(x: number, y: number) {
        console.log(`Scaled from (${this.getScale().x},${this.getScale().y}) to (${x}, ${y})`);
        this.scale.set(x, y);
        this.scaleMatrix.set(
            x, 0, 0,
            0, y, 0,
            0, 0, 1
        );
    }

    randomInt(range) {
        return Math.floor(Math.random() * range);
    }

    private createF(position: Vector2) {
        this.translate(position.x, position.y);
        this.vertices = [
            // left column
            0, 0,
            30, 0,
            0, 150,
            0, 150,
            30, 0,
            30, 150,

            // top rung
            30, 0,
            100, 0,
            30, 30,
            30, 30,
            100, 0,
            100, 30,

            // middle rung
            30, 60,
            67, 60,
            30, 90,
            30, 90,
            67, 60,
            67, 90,
        ];
    }

    private createRectangle(position: THREE.Vector2, width: number, height: number) {
        this.translate(position.x, position.y);
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

    private createRandomRectangle(maxX: number, maxY: number, maxWidth: number, maxHeight: number) {
        const x1 = this.randomInt(maxX);
        const x2 = x1 + this.randomInt(maxWidth);
        const y1 = this.randomInt(maxY);
        const y2 = y1 + this.randomInt(maxHeight);
        this.translate(x1, y1);
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
    private createBindAndBufferData(gl: any, bufferType: GLenum, bufferData, bufferUsage: GLenum) {
        const buffer = gl.createBuffer();
        gl.bindBuffer(bufferType, buffer);
        gl.bufferData(bufferType, new Float32Array(bufferData), bufferUsage);
    }
}

