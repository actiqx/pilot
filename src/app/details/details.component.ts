import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IRoute } from '../_models/route';
import { ISite } from '../_models/sitename';
import { IRouter } from '../_models/router';
import { Routetype } from '../_models/routetype';
import { RouteService } from '../_services/route.service';
import { RouterService } from '../_services/router.service';
import { RoutetypeService } from '../_services/routetype.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  sitenames: ISite[];
  routes: IRoute[];
  router: IRouter[];
  selectedRoutes: any;
  @Output() public RouteEvent = new EventEmitter();
  constructor(private _routes: RouteService) {}

  ngOnInit() {
    this._routes.getRoutes().subscribe((routes: IRoute[]) => {
      this.routes = routes;
    });
    console.log(this.routes);
  }
  public onChangeObj(newObj) {
    this.selectedRoutes = newObj;
  }
}
