import { Geometry } from './geometry';

fdescribe('Geometry', () => {

  describe('initialization behavior', () => {
    let geometry;
    beforeEach(() => {
      geometry = new Geometry();
    });

    it('should create an instance', () => {
      expect(geometry).toBeTruthy();
    });

    it('starts with an empty array of positions', () => {
      expect(geometry.hasOwnProperty('positions')).toBe(true);
    });
  });
});
