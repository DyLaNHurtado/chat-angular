/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleLoginService } from './googleLogin.service';

describe('Service: GoogleLogin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleLoginService]
    });
  });

  it('should ...', inject([GoogleLoginService], (service: GoogleLoginService) => {
    expect(service).toBeTruthy();
  }));
});
