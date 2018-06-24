import { ISite } from './../_models/sitename';
import { Component, OnInit } from '@angular/core';
import { CircleManager } from 'node_modules/@agm/core/services/managers/circle-manager';
import { SitenameComponent } from '../sitename/sitename.component';
import { Input, forwardRef, Inject } from '@angular/core';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [CircleManager]
})
@Injectable()
export class MapComponent implements OnInit {
  // google maps zoom level
  selectedDeviceObj: ISite;
  zoom = 14;
  deviceObjects: any;
  // initial center position for the map
  lat;
  lng;
  markers: Marker[] = [
    {
      lat: 25.764676,
      lng: -100.19484,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ];
  constructor() {}

  ngOnInit() {}
  receiveData(data: any) {
    console.log(data);
    this.selectedDeviceObj = data;
    this.lat = parseFloat(this.selectedDeviceObj.dblatitude);
    this.lng = parseFloat(this.selectedDeviceObj.dblongitude);
  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  nitin(deviceObjects) {
    alert(JSON.stringify(deviceObjects));
  }
}

// just an interface for type safety.
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
