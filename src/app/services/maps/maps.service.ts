import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  location = {
    lat: 0,
    lon: 0
  }

  constructor() { }

  getGeolocation(){
    navigator.geolocation.getCurrentPosition((response) => {
      const { latitude, longitude } = response.coords
      this.location = {
        lat: latitude,
        lon: longitude
      }
    }, () => {

    })
  }
}
