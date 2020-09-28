import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private httpClient: HttpClient) { }


  apiUri = environment.apiUri;


  /**
   * Get all Purchase.
   *
   *
   * @returns Observable<object>
   *
   */
  public getAllPurchase(): Observable<object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log(this.apiUri + '/purchases');
    return this.httpClient.get(this.apiUri + '/purchases', httpOptions).pipe(map(this.extractData));
  }

  /**
   * Update or Add Purchase
   *
   * @returns Observable<object>
   *
   */
  public updateAddPurchase(data): Observable<object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // data.date = new Date(data.date).toISOString()

    return this.httpClient.post(this.apiUri + '/purchase', data).pipe(map(this.extractData));
  }



  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
