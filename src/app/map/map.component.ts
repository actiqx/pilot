import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  zoom: number = 14;
  deviceObjects: any;
  // initial center position for the map
  lat: number;
  lng: number;
  markers: Marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
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

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
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
