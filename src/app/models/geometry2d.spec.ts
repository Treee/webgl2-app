import { Vector2, Matrix3 } from 'three';

import { Geometry2D } from './geometry2d';
import { TextHelperService } from '../services/helpers/text-helper.service';

describe('Geometry', () => {

  let geometry, width, height, textHelperService;
  beforeEach(() => {
    width = 76;
    height = 137;
    textHelperService = new TextHelperService();
    geometry = new Geometry2D(width, height, textHelperService);
  });

  describe('initialization behavior', () => {

    it('should create an instance', () => {
      expect(geometry).toBeTruthy();
    });

    it('starts with an empty array of vertices', () => {
      expect(geometry.hasOwnProperty('vertices')).toBe(true);
    });

    it('starts at position 0,0', () => {
      expect(geometry.position).toEqual(new Vector2(0, 0));
    });
  });

  describe('translate', () => {
    it('sets the position of the geometry to the new x, y values', () => {
      const newX = 10;
      const newY = 15;
      geometry.translate(newX, newY);
      expect(geometry.getPosition()).toEqual(new Vector2(newX, newY));
    });

    it('getTranslationMatrix returns a matrix3 representing the translation', () => {
      const newX = 10;
      const newY = 16;
      const expectedMatrix = new Matrix3();
      expectedMatrix.set(
        1, 0, 0,
        0, 1, 0,
        newX, newY, 1);
      geometry.translate(newX, newY);
      const actualMatrix = geometry.getTranslationMatrix();
      expect(actualMatrix).toEqual(expectedMatrix);
    });
  });

  describe('rotate', () => {
    it('sets the rotation of the geometry to the new x, y values', () => {
      const degreesToRotate = 165;
      const angleInRadians = degreesToRotate * (Math.PI / 180);
      const x = Math.sin(angleInRadians);
      const y = Math.cos(angleInRadians);
      geometry.rotate(degreesToRotate);
      expect(geometry.getRotation()).toEqual(new Vector2(x, y));
    });

    it('getRotationMatrix returns a matrix3 representing the rotation', () => {
      const degreesToRotate = 165;
      const angleInRadians = degreesToRotate * (Math.PI / 180);
      const x = Math.sin(angleInRadians);
      const y = Math.cos(angleInRadians);
      const expectedMatrix = new Matrix3();
      expectedMatrix.set(
        y, -x, 0,
        x, y, 0,
        0, 0, 1
      );
      geometry.rotate(degreesToRotate);
      const actualMatrix = geometry.getRotationMatrix();
      expect(actualMatrix).toEqual(expectedMatrix);
    });
  });

  describe('setScale', () => {
    it('sets the scale of the geometry to the new x, y values', () => {
      const newX = 3;
      const newY = 1.5;
      geometry.setScale(newX, newY);
      expect(geometry.getScale()).toEqual(new Vector2(newX, newY));
    });

    it('getScaleMatrix returns a matrix representing the scale', () => {
      const newX = 1.74;
      const newY = 3.61;
      const expectedMatrix = new Matrix3();
      expectedMatrix.set(
        newX, 0, 0,
        0, newY, 0,
        0, 0, 1
      );
      geometry.setScale(newX, newY);
      const actualMatrix = geometry.getScaleMatrix();
      expect(actualMatrix).toEqual(expectedMatrix);
    });
  });

  describe('transform', () => {
    it('multiplies translation, rotation, and scale matricies to transform the geometry', () => {

      const newXScale = 2;
      const newYScale = 1.5;
      const newXTranslate = 4;
      const newYTranslate = 9;
      const degreesToRotate = 45;
      const expectedTransform = new Matrix3();
      expectedTransform.set(
        1.4142135623730951, -1.414213562373095, 0,
        1.0606601717798212, 1.0606601717798214, 0,
        15.20279579551077, 3.8890872965260126, 1);

      geometry.setScale(newXScale, newYScale);
      geometry.rotate(degreesToRotate);
      geometry.translate(newXTranslate, newYTranslate);
      geometry.transformGeometry(new Matrix3());

      expect(geometry.getTransform()).toEqual(expectedTransform);
    });
  });
});
