import { TestBed, inject } from '@angular/core/testing';

import { TextHelperService } from './text-helper.service';

describe('TextHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextHelperService]
    });
  });

  it('should be created', inject([TextHelperService], (service: TextHelperService) => {
    expect(service).toBeTruthy();
  }));
});
