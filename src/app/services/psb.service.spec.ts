import { TestBed } from '@angular/core/testing';

import { PsbService } from './psb.service';

describe('PsbService', () => {
  let service: PsbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PsbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
