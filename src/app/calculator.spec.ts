import { Calculator } from "./calculator";

fdescribe('Testing calculator', () => {
  it('get 9 in multipling', ()=>{
    //arrange
    const calculator = new Calculator()
    //act
    const rta = calculator.multiply(3,3)
    //assert
    expect(rta).toEqual(9)
  })

  it('get divider results', () => {
    const calculator = new Calculator()
    expect(calculator.divider(6,2)).toEqual(3)
    expect(calculator.divider(6,0)).toBeNull()
  })
})
