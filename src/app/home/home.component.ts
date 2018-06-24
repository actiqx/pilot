import { SharedService } from './../_services/shared.service';
import { ISite } from './../_models/sitename';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SitenameComponent } from '../sitename/sitename.component';
import { GetsitenameService } from '../_services/getsitename.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(SitenameComponent) siteName;
  selectedDeviceObj: any;
  sitenames: ISite[];

  constructor(
    private _getsitename: GetsitenameService,
    private service: SharedService
  ) {}

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
    this.selectedDeviceObj = this.service.getData;
  }
}
