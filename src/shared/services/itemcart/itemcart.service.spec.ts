import { TestBed } from '@angular/core/testing';

import { ItemcartService } from './itemcart.service';

describe('ItemcartService', () => {
  let service: ItemcartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemcartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
