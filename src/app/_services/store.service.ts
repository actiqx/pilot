import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { IStores } from '../_models/stores';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  baseUrl = environment.apiUrl;
  constructor(private http: Http) {}

  getStoreById(id: number): Observable<IStores> {
    return this.http.get(this.baseUrl + 'stores/' + id).pipe(
      map(res => <IStores>res.json()),
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
