import { TestBed } from '@angular/core/testing';

import { GamelogicService } from './gamelogic.service';

describe('GamelogicService', () => {
  let service: GamelogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamelogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
