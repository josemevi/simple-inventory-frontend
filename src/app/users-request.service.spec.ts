import { TestBed } from '@angular/core/testing';

import { UsersRequestService } from './users-request.service';

describe('UsersRequestService', () => {
  let service: UsersRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
