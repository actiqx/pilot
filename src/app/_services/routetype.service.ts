import { Injectable } from '@angular/core';
import { Routetype } from '../_models/routetype';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class RoutetypeService {
  baseUrl = environment.apiUrl;
  private _url = 'route_type';
  constructor(private http: Http) {}
  getRoutetype(): Observable<Routetype[]> {
    return this.http.get(this.baseUrl + 'route_type').pipe(
      map(response => <Routetype[]>response.json()),
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
