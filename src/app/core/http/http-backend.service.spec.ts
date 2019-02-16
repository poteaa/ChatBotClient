import { TestBed } from '@angular/core/testing';

import { HttpBackendService } from './http-backend.service';

describe('HttpBackendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpBackendService = TestBed.get(HttpBackendService);
    expect(service).toBeTruthy();
  });
});
