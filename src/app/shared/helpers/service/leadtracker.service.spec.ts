import { TestBed } from '@angular/core/testing';

import { LeadtrackerService } from './leadtracker.service';

describe('LeadtrackerService', () => {
  let service: LeadtrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeadtrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
