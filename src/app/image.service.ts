import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }


  apiUri = environment.apiUri;

  public getImageById = (id: string) => {
    console.log(id)
    const header = new HttpHeaders({
      'Content-Type': 'application/octet-stream'
    });
    console.log(this.apiUri + '/image/' + id)
    return this.httpClient.get(this.apiUri + '/image/' + id, {
      responseType: 'arraybuffer', headers: header
    })
  }


  /**
   * Post Image Upload
   *
   * @returns Observable<object>
   *
   */
  public postImage(imageData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/octet-stream',
        'File-Name': imageData.image.name ?? 'noname'
      })
    };
    console.log(this.apiUri + '/image');
    return this.httpClient.post(this.apiUri + '/image' + (imageData.id ? '/' + imageData.id : ''), imageData.image, httpOptions);
  }

  /**
   * Post Image Upload
   *
   * @returns Observable<object>
   *
   */
  public updateImage(imageData, imageId): Observable<object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/octet-stream'
      })
    };
    console.log(this.apiUri + '/image');
    return this.httpClient.post(this.apiUri + '/image/' + imageData.id, imageData.image, httpOptions).pipe(map(this.extractData));
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
