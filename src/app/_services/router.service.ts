import { Injectable } from '@angular/core';
import { IRouter } from '../_models/router';
import { Observable, throwError, forkJoin, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  baseUrl = environment.apiUrl;
  private _url = 'router';
  constructor(private http: Http) {}
  getRouter(): Observable<IRouter[]> {
    return this.http.get(this.baseUrl + 'router').pipe(
      map(response => <IRouter[]>response.json()),
      catchError(this.handleError)
    );
  }
  getRouterListBySiteIdRouteType(routeType, siteId): Observable<IRouter[]> {
    return this.http
      .get(
        this.baseUrl +
          'router?route_type_id=' +
          routeType +
          '&site_id=' +
          siteId
      )
      .pipe(
        map(res => <IRouter[]>res.json()),
        catchError(this.handleError)
      );
  }
  getRouters(routeType, siteId): Observable<any[]> {
    return this.http
      .get(
        this.baseUrl +
          'router?route_type_id=' +
          routeType +
          '&site_id=' +
          siteId
      )
      .pipe(
        map((res: any) => res.json()),
        mergeMap((routes: any[]) => {
          if (routes.length > 0) {
            return forkJoin(
              routes.map((route: any) => {
                return this.http
                  .get(this.baseUrl + 'routes/' + route.route_id)
                  .pipe(
                    map((res: any) => {
                      const rout: any = res.json();
                      rout.route = rout;
                      return rout;
                    })
                  );
              })
            );
          }
          return of([]);
        })
      );
  }
  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return throwError(applicationError);
    }
    const serverError = error.json();
    let modelStateError = '';
    if (serverError) {
      // tslint:disable-next-line:forin
      for (const key in serverError) {
        modelStateError += serverError[key] + '\n';
      }
    }
    return throwError(modelStateError || 'Server Error');
  }
}
