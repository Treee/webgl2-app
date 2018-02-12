import { TestBed, inject } from '@angular/core/testing';

import { ShaderProgramService } from './shader-program.service';

describe('ShaderProgramService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShaderProgramService]
    });
  });

  it('should be created', inject([ShaderProgramService], (service: ShaderProgramService) => {
    expect(service).toBeTruthy();
  }));
});
