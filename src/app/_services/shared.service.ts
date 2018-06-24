import { Injectable } from '@angular/core';
import { ISite } from '../_models/sitename';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  sharedData: ISite;
  constructor() {}

  setData(data: ISite) {
    console.log('save data function called' + data);
    this.sharedData = data;
  }
  getData() {
    return this.sharedData;
  }
}
