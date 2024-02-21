import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { CreateProductDTO, Product, UpdateProductDTO } from './../../models/app.models';
import { environment } from 'src/environments/environment.development';
import { generateManyProducts, generateOneProduct } from 'src/app/models/app.mocks';
import { HttpStatusCode } from '@angular/common/http';

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

  describe('getOneProduct',() => {
    it('Should get one product', (doneFn) => {
      const mockData: Product = generateOneProduct()
      const id = '1'

      service.getOne(id).subscribe((data)=>{
        expect(data).toEqual(mockData)
        doneFn()
      })

      const req = httpController.expectOne(`${url}/products/${id}`)
      req.flush(mockData)
      expect(req.request.method).toEqual('GET')
    })

    it('Should return error 404', (doneFn) => {
      const msgError = '404 message';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: msgError
      };
      const id = '1'

      service.getOne(id).subscribe({
        error: (data) => {
          expect(data).toEqual('El producto no existe')
          doneFn()
        }
      })

      const req = httpController.expectOne(`${url}/products/${id}`)
      req.flush(msgError, mockError)
      expect(req.request.method).toBe('GET')
    })

    it('Should return error 409', (doneFn) => {
      const msgError = '409 error'
      const mockError = {
        status: HttpStatusCode.Conflict,
        statusText: msgError
      }
      const id = 'id'

      service.getOne(id).subscribe({
        error: (error) => {
          expect(error).toEqual('Algo esta fallando en el server')
          doneFn()
        }
      })

      const req = httpController.expectOne(`${url}/products/${id}`)
      req.flush(msgError, mockError)
      expect(req.request.method).toBe('GET')
    })

    it('Should return error 401', (doneFn) => {
      const msgError = '401 error'
      const mockError = {
        status: HttpStatusCode.Unauthorized,
        statusText: msgError
      }
      const id = '1'

      service.getOne(id).subscribe({
        error: (error) => {
          expect(error).toBe('No estas permitido')
          doneFn()
        }
      })

      const req = httpController.expectOne(`${url}/products/${id}`)
      req.flush(msgError, mockError)
      expect(req.request.method).toBe('GET')
    })

    it('Should return default error msg', (doneFn) => {
      const errorMsg = 'error 500'
      const mockError = {
        status: HttpStatusCode.InternalServerError,
        statusText: errorMsg
      }
      const id = "1"

      service.getOne(id).subscribe({
        error: (error) => {
          expect(error).toEqual('Ups algo salio mal')
          doneFn()
        }
      })

      const req = httpController.expectOne(`${url}/products/${id}`)
      req.flush(errorMsg, mockError)
      expect(req.request.method).toBe('GET')
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
      expect(req.request.body).toEqual(dto)
    })
  })

  describe('delete product', () => {
    it('Should delete product', (doneFn) => {
      const mockData = true
      const id = '1'
      service.delete(id).subscribe((data)=>{
        expect(data).toEqual(mockData)
        doneFn()
      })
      const req = httpController.expectOne(`${url}/products/${id}`)
      req.flush(mockData)
      expect(req.request.method).toEqual('DELETE')
    })
  })

  afterEach(() => {
    httpController.verify()
  })
});
