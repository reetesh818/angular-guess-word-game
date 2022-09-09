import { TestBed } from '@angular/core/testing';

import { WordapiService } from './wordapi.service';

describe('WordapiService', () => {
  let service: WordapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
