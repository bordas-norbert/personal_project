import { TestBed } from '@angular/core/testing';

import { FilterListproductsService } from './filter-listproducts.service';

describe('FilterListproductsService', () => {
  let service: FilterListproductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterListproductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
