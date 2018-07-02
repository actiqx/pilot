import { ISite } from './../_models/sitename';
import { Component, OnInit } from '@angular/core';
import { CircleManager } from 'node_modules/@agm/core/services/managers/circle-manager';
import { SitenameComponent } from '../sitename/sitename.component';
import { Input, forwardRef, Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { IRouter } from '../_models/router';
import { IStores } from '../_models/stores';
import { LatLng } from 'node_modules/@agm/core/services/google-maps-types';
declare var google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [CircleManager]
})
@Injectable()
export class MapComponent implements OnInit {
  routerdata?: any;
  store: IStores;
  // google maps zoom level
  selectedDeviceObj: ISite;
  zoom = 14;
  deviceObjects: any;

  // initial center position for the map
  lat;
  lng;
  dir = undefined;
  // Route
  origin: {};
  destination: {};
  // waypoints: any[] = [];
  waypoints = [];
  points = {};

  location: LatLng;
  // To Set Up Markers inMap
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
  renderOptions: { suppressMarkers: true };
  markerOptions = {
    origin: {
      icon: 'https://i.imgur.com/7teZKif.png'
    },
    destination: {
      icon: 'https://i.imgur.com/7teZKif.png',
      infoWindow: `
        <h4>Hello<h4>
        <a href='http://www-e.ntust.edu.tw/home.php' target='_blank'>Taiwan Tech</a>
        `
    }
  };
  constructor() {}

  ngOnInit() {}

  receiveData(data: any) {
    console.log(data);
    this.selectedDeviceObj = data;
    this.lat = parseFloat(this.selectedDeviceObj.dblatitude);
    this.lng = parseFloat(this.selectedDeviceObj.dblongitude);
  }
  recieveStoreData(data) {
    this.routerdata = data;
    this.points = {};

    this.origin = {
      lat: parseFloat(this.routerdata[0].store[0].lat),
      lng: parseFloat(this.routerdata[0].store[0].lng)
    };
    this.destination = {
      lat: parseFloat(this.routerdata[this.routerdata.length - 1].store[0].lat),
      lng: parseFloat(this.routerdata[this.routerdata.length - 1].store[0].lng)
    };
    for (let i = 1; i < this.routerdata.length - 1; i++) {
      this.points = {
        location: {
          lat: parseFloat(this.routerdata[i].store[0].lat),
          lng: parseFloat(this.routerdata[i].store[0].lng)
        },
        stopover: true
      };
      this.waypoints.push(this.points);
    }

    console.log('In Map COmponent:' + JSON.stringify(this.destination));
    console.log('In Map COmponent:' + JSON.stringify(this.waypoints));
  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  createLatLng(lat: number, lng: number): LatLng {
    return {
      lat: function() {
        return lat;
      },
      lng: function() {
        return lng;
      }
    } as LatLng;
  }
  getDirection($event) {
    // this.dir {
    //   this.origin : { lat: 19.04334, lng: -98.20193 },
    //   this.destination : { lat: -100.378413, lng: 25.660033 }
    // }
    this.dir = {
      origin: { lat: 19.04334, lng: -98.20193 },
      destination: { lat: -100.378413, lng: 25.660033 }
    };
    // this.waypoints = [
    //   {
    //     lat: 20.659698,
    //     lng: -103.349609
    //   },
    //   {
    //     lat: 21.13052,
    //     lng: -101.671
    //   },
    //   {
    //     lat: -100.354192,
    //     lng: 25.653695
    //   }
    // ];
  }
}

// just an interface for type safety.
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
