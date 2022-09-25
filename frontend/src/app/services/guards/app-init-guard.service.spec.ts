import { TestBed } from '@angular/core/testing';

import { AppInitGuardService } from './app-init-guard.service';

describe('AppInitGuardService', () => {
  let service: AppInitGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppInitGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
