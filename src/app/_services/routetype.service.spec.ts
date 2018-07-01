/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoutetypeService } from './routetype.service';

describe('Service: Routetype', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoutetypeService]
    });
  });

  it('should ...', inject([RoutetypeService], (service: RoutetypeService) => {
    expect(service).toBeTruthy();
  }));
});
