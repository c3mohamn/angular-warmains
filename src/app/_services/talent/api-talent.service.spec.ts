import { TestBed, inject } from '@angular/core/testing';

import { ApiTalentService } from './api-talent.service';

describe('ApiTalentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiTalentService]
    });
  });

  it('should be created', inject([ApiTalentService], (service: ApiTalentService) => {
    expect(service).toBeTruthy();
  }));
});
