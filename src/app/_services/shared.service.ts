import { Injectable } from '@angular/core';
import { ISite } from '../_models/sitename';
import { DeviceObjects } from '../domains/deviceObject';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  sharedData: ISite;
  constructor() {}

  deviceObjects: DeviceObjects = new DeviceObjects();

  setData(data: ISite) {
    console.log('save data function called' + data);
    this.sharedData = data;
  }
  getData() {
    return this.sharedData;
    // this.deviceObjects.id = 1;
    // this.deviceObjects.name = "nitin";
  }
}
