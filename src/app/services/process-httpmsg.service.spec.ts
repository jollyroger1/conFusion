import { TestBed, inject } from '@angular/core/testing';

/* import { ProcessHttpMsgService } from './process-httpmsg.service'; */
import { ProcessHTTPMsgService } from './process-httpmsg.service';

describe('ProcessHTTPMsgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessHTTPMsgService]
    });
  });

  it('should be created', inject([ProcessHTTPMsgService], (service: ProcessHTTPMsgService) => {
    expect(service).toBeTruthy();
  }));
});
