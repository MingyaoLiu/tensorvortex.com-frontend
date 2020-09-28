import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    constructor(private httpClient: HttpClient) { }


    apiUri = environment.apiUri;

    /**
     * Get Post by Id.
     *
     *
     * @returns Observable<object>
     *
     */
    public getPost(postId: string): Observable<object> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        console.log(this.apiUri + '/post/' + postId);
        return this.httpClient.get(this.apiUri + '/post/' + postId).pipe(map(this.extractData));
    }

    /**
     * Get All Blog Posts.
     *
     *
     * @returns Observable<object>
     *
     */
    public getBlogs(): Observable<object> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        console.log(this.apiUri);
        return this.httpClient.get(this.apiUri + '/blog').pipe(map(this.extractData));
    }

    /**
     * Get All Saved Drafts.
     *
     *
     * @returns Observable<object>
     *
     */
    public getDrafts(): Observable<object> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        console.log(this.apiUri);
        return this.httpClient.get(this.apiUri + '/drafts').pipe(map(this.extractData));
    }

    /**
     * Get Draft by Id.
     *
     *
     * @returns Observable<object>
     *
     */
    public getDraft(postId: string): Observable<object> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        console.log(this.apiUri + '/post/' + postId);
        return this.httpClient.get(this.apiUri + '/post/' + postId).pipe(map(this.extractData));
    }

    public saveDraft(postId: string): Observable<object> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        console.log(this.apiUri + '/post/' + postId);
        return this.httpClient.get(this.apiUri + '/post/' + postId).pipe(map(this.extractData));
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
