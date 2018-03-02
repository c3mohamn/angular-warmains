import { TestBed, async, inject } from '@angular/core/testing';

import { LoggedInGuard } from './logged-in.guard';

describe('LoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggedInGuard]
    });
  });

  it('should ...', inject([LoggedInGuard], (guard: LoggedInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
