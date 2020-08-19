import { TestBed } from '@angular/core/testing';

import { AuthenticatedGuard } from './authenticated.guard';

describe('AuthenticationGuard', () => {
  let guard: AuthenticatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthenticatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
