/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetsitenameService } from './getsitename.service';

describe('Service: Getsitename', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetsitenameService]
    });
  });

  it('should ...', inject([GetsitenameService], (service: GetsitenameService) => {
    expect(service).toBeTruthy();
  }));
});
