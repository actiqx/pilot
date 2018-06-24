import { Component, OnInit, Input, Output } from '@angular/core';
import { GetsitenameService } from '../_services/getsitename.service';
import { MapComponent } from '../map/map.component';
import { EventEmitter } from 'events';
import { ISite } from '../_models/sitename';

@Component({
  selector: 'app-sitename',
  templateUrl: './sitename.component.html',
  styleUrls: ['./sitename.component.css']
})
export class SitenameComponent implements OnInit {
  sitenames: ISite[];
  selectedSiteName: {};
  public selectedStatusId = {};
  @Output() selectedDeviceObj = new EventEmitter();

  constructor(private _getsitename: GetsitenameService) {}

  ngOnInit() {
    this._getsitename.getSites().subscribe((sitenames: ISite[]) => {
      this.sitenames = sitenames;
    });
    console.log(this.sitenames);
  }
  public onChangeObj(newObj) {
    this.selectedDeviceObj = newObj;
    console.log(this.selectedDeviceObj);
  }
  getSite() {
    this.selectedDeviceObj.emit(this.selectedSiteName);
    // this.mapComponent.nitin(this.selectedDeviceObj);
  }
}
