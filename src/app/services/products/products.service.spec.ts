import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { CreateProductDTO, Product, UpdateProductDTO } from './../../models/app.models';
import { environment } from 'src/environments/environment.development';
import { generateManyProducts, generateOneProduct } from 'src/app/models/app.mocks';

fdescribe('ProductsService', () => {
  let service: ProductsService;
  let httpController: HttpTestingController
  const url = `${environment.API_URL}/api/v1`

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
      const mockData: Product[] = generateManyProducts(2)
      service.getAllSimple().subscribe((data)=>{
        expect(data).toEqual(mockData)
        doneFn()
      })
      //expect one request with an url
      const req = httpController.expectOne(`${url}/products`)
      //flush request with expected mocked data
      req.flush(mockData)
      //controller verify request

    })
  })

  describe('getAll', () => {
    it('Should get response from all products', (doneFn)=> {
      const mockData: Product[] = generateManyProducts()
      service.getAll().subscribe((data)=> {
        expect(data.length).toEqual(mockData.length)
        doneFn()
      })
      const req = httpController.expectOne(`${url}/products`)
      req.flush(mockData)
    })
    it('should get all products with taxes', (doneFn) => {
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 0
        },
        {
          ...generateOneProduct(),
          price: -100
        },
        {
          ...generateOneProduct()
        }
      ]
      service.getAll().subscribe((data) => {
        expect(data[0].taxes).toBe(0)
        expect(data[2].taxes).toBeDefined()
        doneFn()
      })
      const req = httpController.expectOne(`${url}/products`)
      req.flush(mockData)
    })
    it('Should get products with offset and limit params', (doneFn) => {
      const mockData: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 3;

      service.getAll(limit, offset).subscribe((data) => {
        expect(data.length).toBe(mockData.length)
        doneFn()
      })

      const req = httpController.expectOne(`${url}/products?limit=${limit}&offset=${offset}`)
      req.flush(mockData)
      const params = req.request.params
      expect(params.get('limit')).toBe(limit+'')
      expect(params.get('offset')).toBe(`${offset}`)
    })
  })

  describe('createProduct', () => {
    it('Should create a product ', (doneFn) => {
      const mockData = generateOneProduct()
      const dto: CreateProductDTO = {
        title: 'new Product',
        price: 100,
        images: ['img'],
        description: 'bla bla bla',
        categoryId: 12
      }
      service.create({...dto}).subscribe((data) => {
        expect(data).toEqual(mockData)
        doneFn()
      })
      const req = httpController.expectOne(`${url}/products`)
      req.flush(mockData)
      expect(req.request.method).toBe('POST')
      expect(req.request.body).toEqual(dto)
    })
  })

  describe('Put product', () => {
    it('Should modify product', (doneFn) => {
      const mockData = generateOneProduct()
      const dto : UpdateProductDTO = {
        title : 'prueba'
      }
      const id = '1'
      service.update(id, {...dto}).subscribe((data) => {
        expect(data).toEqual(mockData)
        console.log(data)
        doneFn()
      })
      const req = httpController.expectOne(`${url}/products/${id}`)
      req.flush(mockData)
      expect(req.request.method).toBe('PUT')
      expect(req.request.body).toBe(dto)
    })
  })

  afterEach(() => {
    httpController.verify()
  })
});
