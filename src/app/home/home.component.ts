import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Esipotech Pilot';
  lat = 19.432608;
  lng = -99.133209;
  public zoom: Number = 14;
  public dir = undefined;
  locationChoosen = false;
  onChooseLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChoosen = true;
  }
  getDirection() {
    this.dir = {
      origin: { lat: 19.432608, lng: -99.133209 },
      destination: { lat: 20.0910963, lng: -98.7623874 }
    };
  }
}
