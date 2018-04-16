import { TestBed, inject } from '@angular/core/testing';

import { TextHelperService } from './text-helper.service';
import { Matrix3, Vector3 } from 'three';

describe('TextHelperService', () => {
  let service: TextHelperService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextHelperService]
    });
    service = new TextHelperService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('prettyPrintMatrix3', () => {
    it('prints the identity matrix correctly', () => {
      const expected = `[1, 0, 0\n0, 1, 0\n0, 0, 1]`;
      let matrix = new Matrix3();
      const actual = service.prettyPrintMatrix3(matrix);

      expect(actual).toEqual(expected);
    });

    it('prints a random matrix correctly', () => {
      const a00 = Math.random();
      const a01 = Math.random();
      const a02 = Math.random();
      const a10 = Math.random();
      const a11 = Math.random();
      const a12 = Math.random();
      const a20 = Math.random();
      const a21 = Math.random();
      const a22 = Math.random();
      const expected = `[${a00}, ${a01}, ${a02}\n${a10}, ${a11}, ${a12}\n${a20}, ${a21}, ${a22}]`;
      let matrix = new Matrix3();
      matrix.set(
        a00, a01, a02,
        a10, a11, a12,
        a20, a21, a22
      );
      const actual = service.prettyPrintMatrix3(matrix);
      expect(actual).toEqual(expected);
    });
  });

  describe('prettyPrintVector3', () => {
    it('prints a vector3 correctly', () => {
      const expected = '[1, 2, 3]';
      let vector = new Vector3(1, 2, 3);

      const actual = service.prettyPrintVector3(vector);

      expect(actual).toEqual(expected);
    });

    it('prints a random vector3 correctly', () => {
      const x = Math.random();
      const y = Math.random();
      const z = Math.random();
      const expected = `[${x}, ${y}, ${z}]`;
      let vector = new Vector3(x, y, z);

      const actual = service.prettyPrintVector3(vector);

      expect(actual).toEqual(expected);
    });
  });
});
