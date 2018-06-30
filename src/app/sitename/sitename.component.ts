import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetsitenameService } from '../_services/getsitename.service';
import { RouteService } from '../_services/route.service';
import { RouterService } from '../_services/router.service';
import { RoutetypeService } from '../_services/routetype.service';
import { MapComponent } from '../map/map.component';
import { IRoute } from '../_models/route';
import { ISite } from '../_models/sitename';
import { IRouter } from '../_models/router';
import { Routetype } from '../_models/routetype';
import { StoreService } from '../_services/store.service';
import { forEach } from '@angular/router/src/utils/collection';
import { IStores } from '../_models/stores';
import { debounceTime } from 'rxjs/operators';
import { LatLng } from 'node_modules/@agm/core/services/google-maps-types';

@Component({
  selector: 'app-sitename',
  templateUrl: './sitename.component.html',
  styleUrls: ['./sitename.component.css']
})
export class SitenameComponent implements OnInit {
  _isOpen: Boolean = false;
  sitenames: ISite[];
  routes: IRoute[];
  router: IRouter[];
  route_type: Routetype[];
  selectedDeviceObj: any;
  selectedDeviceObj1: any;
  selectedDeviceObj2: any;
  selectedDeviceObj3: any;
  routeType: string[];
  selectedRouteType: any;
  selectedRouteName: any;
  routerdata: IRouter[] = [];
  storedata: IRouter[] = [];
  @Output() public siteNameEvent = new EventEmitter();
  @Output() public RouteEvent = new EventEmitter();
  @Output() public RouterEvent = new EventEmitter();
  @Output() public RouteTypeEvent = new EventEmitter();
  @Output() public StoreDataEvent = new EventEmitter();
  constructor(
    private _getsitename: GetsitenameService,
    private _routes: RouteService,
    private _router: RouterService,
    private _routetype: RoutetypeService,
    private _stores: StoreService
  ) {}

  ngOnInit() {
    this.routeType = ['PRESALE', 'AUTOSALE', 'DELIVERY'];
    this._getsitename.getSites().subscribe((sitenames: ISite[]) => {
      this.sitenames = sitenames;
    });
    this._routes.getRoutes().subscribe((routes: IRoute[]) => {
      this.routes = routes;
    });
    this._router.getRouter().subscribe((router: IRouter[]) => {
      this.router = router;
    });
    this._routetype.getRoutetype().subscribe((route_type: Routetype[]) => {
      this.route_type = route_type;
    });

    console.log(this.sitenames);
    console.log(this.routes);
    console.log(this.router);
    console.log(this.route_type);
  }
  public onChangeObj(newObj) {
    this.selectedDeviceObj = newObj;
  }
  onChangeSiteId(routte) {
    this.selectedRouteType = routte;
    this._routes
      .getRoutesByRoutetype(routte.routetype_name)
      .subscribe((route: IRoute[]) => {
        this.routes = route;
      });
  }
  getSite() {
    this._isOpen = true;
    this.siteNameEvent.emit(this.selectedDeviceObj);
  }
  getRoutes() {
    this.RouteEvent.emit(this.selectedDeviceObj1);
  }
  // getRouter() {
  //   this.RouterEvent.emit(this.selectedDeviceObj2);
  // }
  getRoutetype() {
    this.RouteTypeEvent.emit(this.selectedDeviceObj3);
  }
  getRouterClick() {
    this._router
      .getRouterListBySiteIdRouteType(
        this.selectedRouteType.id,
        this.selectedDeviceObj.id
      )
      .subscribe((data: IRouter[]) => {
        this.routerdata = data;
        console.log(data);
        this.getStoresOnSelectedRoute();
        console.log(data);
      });

    this.StoreDataEvent.emit(this.storedata);
  }
  getStoresOnSelectedRoute() {
    this.routerdata.forEach(item => {
      this._stores.getStoreById(item.store_id).subscribe(res => {
        item.store = [];
        item.store.push(res);
        this.storedata.push(item);
      });
    });
  }
}
