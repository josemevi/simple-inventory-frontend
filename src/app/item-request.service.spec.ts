import { TestBed } from '@angular/core/testing';

import { ItemRequestService } from './item-request.service';

describe('ItemRequestService', () => {
  let service: ItemRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
