// import { TestBed } from '@angular/core/testing';

import { firstValueFrom } from 'rxjs';
import { ValueService } from './value.service';

fdescribe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    service = new ValueService()
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('set Value', () => {
    it('should set value',() => {
      service.setValue('newValue')
      expect(service.getValue()).toBe('newValue')
    })
  })

  describe('get value', () => {
    it('should get current value = "my value"', () => {
      expect(service.getValue()).toBe('my value')
    })
  })

  describe('get promise', () => {
    it('should get value from promise asyn/await', async () => {
      const rta = await service.getPromiseValue()
      expect(rta).toBe('my value')
    })
    /* ojo en estos casos cuando la funcion no termina de forma "lineal" o asincrona
    es necesario indicar donde va a terminar la prueba, para esto se usa un funcion
    que viene como parametro en la funcion que ejecuta la prueba llamda doneFn
    */
    it('should get value from promise with then', (doneFn) => {
      service.getPromiseValue().then((value) => {
        expect(value).toBe('my value')
        doneFn()
      })
    })
  })

  describe('get observable', () => {
    it('should get value with the observable suscribe', (doneFn) => {
      service.getObservable().subscribe((value) => {
        expect(value).toBe('my value')
        doneFn()
      })
    })
    it('should get value with the observable suscribe', async () => {
      const rta = await firstValueFrom(service.getObservable())
      expect(rta).toBe('my value')
    })
  })
});
