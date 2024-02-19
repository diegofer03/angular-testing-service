import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {
  private value = 'my value'

  constructor() { }

  getValue(){
    return this.value
  }

  setValue(data: string){
    this.value = data
  }

  getPromiseValue(){
    return Promise.resolve(this.value)
  }

  getObservable(){
    return of(this.value)
  }
}
