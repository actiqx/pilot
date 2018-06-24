import { Injectable } from '@angular/core';
import { ISite } from '../_models/sitename';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class GetsitenameService {
  baseUrl = environment.apiUrl;
  private _url = 'deviceObjects';
  constructor(private http: Http) {}

  getSites(): Observable<ISite[]> {
    return this.http.get(this.baseUrl + 'deviceObjects').pipe(
      map(response => <ISite[]>response.json()),
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
