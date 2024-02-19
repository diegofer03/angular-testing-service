import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { Product } from './../../models/app.models';
import { environment } from 'src/environments/environment.development';
import { generateManyProducts } from 'src/app/models/app.mocks';

fdescribe('ProductsService', () => {
  let service: ProductsService;
  let httpController: HttpTestingController
  const url = `${environment.API_URL}/api/v1/products`

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ProductsService
      ]
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllSimple', () => {
    it('Should get response from products Api', (doneFn) => {
      const mockData: Product[] = generateManyProducts()
      service.getAllSimple().subscribe((data)=>{
        expect(data).toEqual(mockData)
        doneFn()
      })
      //expect one request with an url
      const req = httpController.expectOne(url)
      //flush request with expected mocked data
      req.flush(mockData)
      //controller verify request
      httpController.verify()
    })
  })
});
