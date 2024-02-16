export class Calculator{
  multiply(a: number, b: number){
    return a * b
  }
  divider(a: number, b: number){
    if(b === 0) return null
    return a/b
  }
}
