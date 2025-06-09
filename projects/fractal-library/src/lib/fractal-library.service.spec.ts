import { TestBed } from '@angular/core/testing';

import { FractalLibraryService } from './fractal-library.service';

describe('FractalLibraryService', () => {
  let service: FractalLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FractalLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
