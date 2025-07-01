import { TestBed } from '@angular/core/testing';

import { LoaderServiceTsService } from './loader.service.ts.service';

describe('LoaderServiceTsService', () => {
  let service: LoaderServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
