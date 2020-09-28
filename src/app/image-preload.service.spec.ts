import { TestBed } from '@angular/core/testing';

import { ImagePreloadService } from './image-preload.service';

describe('ImagePreloadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImagePreloadService = TestBed.get(ImagePreloadService);
    expect(service).toBeTruthy();
  });
});
