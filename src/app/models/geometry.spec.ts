import { Geometry2D } from './geometry';

fdescribe('Geometry', () => {

  const mockGl = {
    createBuffer: jasmine.createSpy('createBuffer'),
    bindBuffer: jasmine.createSpy('bindBuffer'),
    bufferData: jasmine.createSpy('bufferData')
  }

  describe('initialization behavior', () => {
    let geometry;
    beforeEach(() => {
      geometry = new Geometry2D(mockGl, {});
    });

    it('should create an instance', () => {
      expect(geometry).toBeTruthy();
    });

    it('starts with an empty array of vertices', () => {
      expect(geometry.hasOwnProperty('vertices')).toBe(true);
    });

    it('starts at position 0,0', () => {
      expect(geometry.position.x).toEqual(0);
      expect(geometry.position.y).toEqual(0);
    });
  });
});
