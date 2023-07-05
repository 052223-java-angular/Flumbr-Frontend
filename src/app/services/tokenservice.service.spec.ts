import { TestBed } from '@angular/core/testing';

import { TokenService } from './tokenservice.service';

describe('TokenserviceService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
