import { MasterService } from './master.service';
import { ValueService } from './value.service';

describe('MasterService', () => {
  let service: MasterService;

  beforeEach(() => {
  });

  it('should be called getValue function', () => {
    const fakeService = {getValue: () => 'fakeValue'}
    service = new MasterService(fakeService as ValueService)
    expect(service.getValue()).toBe('fakeValue');
  });

  it('should call getValue function with mock', () => {
    const valueMock = jasmine.createSpyObj<ValueService>('ValueService', ['getValue'])
    valueMock.getValue.and.returnValue('fake value')
    service = new MasterService(valueMock)
    // expect(service.getValue()).toBe('fake value')
    service.getValue()
    expect(valueMock.getValue).toHaveBeenCalled()
    expect(valueMock.getValue).toHaveBeenCalledTimes(1)
  })
});
