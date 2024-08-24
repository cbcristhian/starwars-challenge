import { TestBed } from '@angular/core/testing';

import { SwapiService } from './swapi.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SwapiService', () => {
  let service: SwapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SwapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
