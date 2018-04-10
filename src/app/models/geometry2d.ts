import { Vector2, Vector3, Vector4, Matrix3 } from 'three';
import { TextHelperService } from '../services/helpers/text-helper.service';

export class Geometry2D {

    private transform: Matrix3 = new Matrix3();

    private position: Vector3 = new Vector3(0, 0, 0);
    private translationMatrix: Matrix3 = new Matrix3();

    private rotation: Vector3 = new Vector3(0, 1, 0);
    private rotationMaxtrix: Matrix3 = new Matrix3();

    private scale: Vector3 = new Vector3(1, 1, 1);
    private scaleMatrix: Matrix3 = new Matrix3();

    private geometryCenter: Vector3 = new Vector3(0, 0, 0);
    private geometryCenterMatrix: Matrix3 = new Matrix3();

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
        let tempTransform = new Matrix3();

        tempTransform = tempTransform.multiplyMatrices(tempTransform, this.rotationMaxtrix);
        tempTransform = tempTransform.multiplyMatrices(tempTransform, this.scaleMatrix);
        tempTransform = tempTransform.multiplyMatrices(tempTransform, this.translationMatrix);
        tempTransform = tempTransform.multiplyMatrices(tempTransform, projectionMatrix);
        this.transform = tempTransform;
    }

    setColor(red: number, green: number, blue: number, alpha: number) {
        this.color.set(red, green, blue, alpha);
    }

    getColor(): Vector4 {
        return this.color.clone();
    }

    getPosition(): Vector3 {
        return this.position.clone();
    }

    getTranslationMatrix(): Matrix3 {
        return this.translationMatrix.clone();
    }

    translate(x: number, y: number, z: number) {
        // 0, 0 is the origin which means the middle of the geometry resides at 0, 0.
        // We need to modify the math so the top left corner is 0, 0
        // console.log(`Translated from (${this.getPosition().x},${this.getPosition().y}) to (${x}, ${y})`);
        this.position.set(x, y, z);
        this.translationMatrix.set(
            1, 0, 0,
            0, 1, 0,
            x, y, 1);
    }

    getRotation(): Vector3 {
        return this.rotation.clone();
    }

    getRotationMatrix(): Matrix3 {
        return this.rotationMaxtrix.clone();
    }

    rotate(angleInDegrees: number, rotationOrigin?: Matrix3) {
        // console.log(`Rotated from (${this.getRotation().x},${this.getRotation().y}) by ${angleInDegrees} degrees`);
        const angleInRadians = angleInDegrees * (Math.PI / 180);
        const x = Math.sin(angleInRadians);
        const y = Math.cos(angleInRadians);
        this.rotation.set(x, y, 0);
        let tempRotation = new Matrix3();
        tempRotation.set(
            y, -x, 0,
            x, y, 0,
            0, 0, 1
        );

        if (!rotationOrigin) {
            rotationOrigin = this.getCenterMatrix();
        }
        // translate the point in which to rotate to the origin, then rotate
        tempRotation = tempRotation.multiplyMatrices(rotationOrigin, tempRotation);
        // translate the point that was just rotated around back
        tempRotation = tempRotation.multiplyMatrices(tempRotation, rotationOrigin.getInverse(rotationOrigin));
        this.rotationMaxtrix = tempRotation;
    }

    getScale(): Vector3 {
        return this.scale.clone();
    }

    getScaleMatrix(): Matrix3 {
        return this.scaleMatrix.clone();
    }

    setScale(x: number, y: number, z: number) {
        // console.log(`Scaled from (${this.getScale().x},${this.getScale().y}) to (${x}, ${y})`);
        this.scale.set(x, y, z);
        this.scaleMatrix.set(
            x, 0, 0,
            0, y, 0,
            0, 0, 1
        );
    }

    setCenter(x: number, y: number, z: number) {
        this.geometryCenter.set(x, y, z);
        this.geometryCenterMatrix.set(
            1, 0, 0,
            0, 1, 0,
            x, y, 1
        );
    }

    getCenter(): Vector3 {
        return this.geometryCenter.clone();
    }

    getCenterMatrix(): Matrix3 {
        return this.geometryCenterMatrix.clone();
    }

    randomInt(range) {
        return Math.floor(Math.random() * range);
    }

    private createF(position: Vector3) {
        this.translate(position.x, position.y, position.z);
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
        this.setCenter(-50, -75, 1);
    }

    private createRectangle(position: Vector3, width: number, height: number) {
        this.translate(position.x, position.y, position.z);
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
        this.setCenter(width / 2, height / 2, 1);
    }

    private createRandomRectangle(maxX: number, maxY: number, maxWidth: number, maxHeight: number) {
        const x1 = this.randomInt(maxX);
        const x2 = x1 + this.randomInt(maxWidth);
        const y1 = this.randomInt(maxY);
        const y2 = y1 + this.randomInt(maxHeight);
        this.translate(x1, y1, 0);
        this.vertices = [
            x1, y1,
            x2, y1,
            x1, y2,
            x1, y2,
            x2, y1,
            x2, y2
        ];
        this.setCenter(maxWidth / 2, maxHeight / 2, 1);
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

