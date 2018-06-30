import { Injectable } from '@angular/core';
import { IRoute } from '../_models/route';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  baseUrl = environment.apiUrl;

  constructor(private http: Http) {}
  getRoutes(): Observable<IRoute[]> {
    return this.http.get(this.baseUrl + 'routes').pipe(
      map(response => <IRoute[]>response.json()),
      catchError(this.handleError)
    );
  }
  getRoutesByRoutetype(routeType: string): Observable<IRoute[]> {
    return this.http.get(this.baseUrl + 'routes?route_type=' + routeType).pipe(
      map(res => <IRoute[]>res.json()),
      catchError(this.handleError)
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
