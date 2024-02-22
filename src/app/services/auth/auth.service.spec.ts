import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment.development';

describe('AuthService', () => {
  let service: AuthService;
  let tokenSerivce : TokenService
  let httpController : HttpTestingController
  const url = `${environment.API_URL}/api/v1`

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        TokenService,
      ]
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController)
    tokenSerivce = TestBed.inject(TokenService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test for login', () => {
    it('Should login with user data and return token', (doneFn) => {
      const mockData = {
        access_token : '12345'
      }
      const email = 'prueba@mail.com'
      const password = '12345678'
      service.login(email, password).subscribe((data) => {
        expect(data).toEqual(mockData)
        doneFn()
      })
      const req = httpController.expectOne(`${url}/auth/login`)
      req.flush(mockData)
      expect(req.request.method).toBe('POST')
    })

    it('should call saveToken', (doneFn) => {
      const mockData = {
        access_token : '12345'
      }
      const email = 'prueba@mail.com'
      const password = '12345678'
      spyOn(tokenSerivce, 'saveToken').and.callThrough()
      service.login(email, password).subscribe((data) => {
        expect(data).toEqual(mockData)
        expect(tokenSerivce.saveToken).toHaveBeenCalledOnceWith(mockData.access_token)
        doneFn()
      })
      const req = httpController.expectOne(`${url}/auth/login`)
      req.flush(mockData)
      expect(req.request.method).toBe('POST')
    })
  })

  afterEach(() => {
    httpController.verify()
  })
});
