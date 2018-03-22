import { TestBed, inject } from '@angular/core/testing';

import { TextHelperService } from './text-helper.service';
import { Matrix3 } from 'three';

fdescribe('TextHelperService', () => {
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
});
