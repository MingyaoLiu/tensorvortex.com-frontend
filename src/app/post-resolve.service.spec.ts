import { TestBed } from '@angular/core/testing';

import { PostResolveService } from './post-resolve.service';

describe('PostResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostResolveService = TestBed.get(PostResolveService);
    expect(service).toBeTruthy();
  });
});
