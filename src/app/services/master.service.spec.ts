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
});
