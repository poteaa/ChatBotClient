import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpErrorHandlerService } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class HttpBackendService {

  constructor(private httpClient: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService) { }

/**
* Creates a generic get request. T: responseType
* @param url: url without the base url
* @returns: an observable for the request
*/
get<T>(url: string): Observable<T> {
  return this.httpClient
  .get<T>(`${environment.backendUrl}${url}`)
  .pipe(catchError(err => this.httpErrorHandler.handle(err)));
}

/**
* Creates a generic post request. T: responseType, U: requestType
* @param url: url without the base url
* @returns: an observable for the request
*/
post<T, U>(url: string, data: U): Observable<any> {
  const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  const body = JSON.stringify(data);
  return this.httpClient
  .post<T>(`${environment.backendUrl}${url}`, body, {
    headers: headers,
    responseType: 'json'
  })
  .pipe(catchError(err => this.httpErrorHandler.handle(err)));
  }
}
