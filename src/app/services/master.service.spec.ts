import { TestBed } from '@angular/core/testing';
import { MasterService } from './master.service';
import { ValueService } from './value.service';

fdescribe('MasterService', () => {
  let service: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>

  beforeEach(() => {
    const spy = jasmine.createSpyObj<ValueService>('ValueService', ['getValue'])

    TestBed.configureTestingModule({
      providers: [
        MasterService, {provide: ValueService, useValue: spy}
      ]
    })

    service = TestBed.inject(MasterService)
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>
  });

  it('Should be created', ()=>{
    expect(service).toBeTruthy()
  })

  it('should be called getValue function', () => {
    // const fakeService = {getValue: () => 'fakeValue'}
    // service = new MasterService(fakeService as ValueService)
    valueServiceSpy.getValue.and.returnValue('fake Value')
    expect(service.getValue()).toBe('fake Value');
  });

  it('should call getValue function with mock', () => {
    // const valueMock = jasmine.createSpyObj<ValueService>('ValueService', ['getValue'])

    // service = new MasterService(valueServiceSpy)
    // expect(service.getValue()).toBe('fake value')
    service.getValue()
    expect(valueServiceSpy.getValue).toHaveBeenCalled()
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1)
  })
});
