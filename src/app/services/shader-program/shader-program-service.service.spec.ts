import { TestBed, inject } from '@angular/core/testing';

import { ShaderProgramServiceService } from './shader-program-service.service';

describe('ShaderProgramServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShaderProgramServiceService]
    });
  });

  it('should be created', inject([ShaderProgramServiceService], (service: ShaderProgramServiceService) => {
    expect(service).toBeTruthy();
  }));
});
