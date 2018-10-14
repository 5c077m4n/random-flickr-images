import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, retryWhen, delay, take } from 'rxjs/operators';


@Injectable({ providedIn: 'root' }) export class FlickrService {
	private readonly key = '04123b5d9f451345746a0e32c49fcd56';
	private readonly secret = 'e52d61410b701af9';
	private readonly URL = 'https://api.flickr.com/services/rest/';
	constructor(private http: HttpClient) {}

	public getImages(): Observable<any> {
		return this.http.get(`${this.URL}?method=filckr.test.login&api_key=${this.key}&format=json&nojsoncallback=1`)
			.pipe(
				tap(res => {
					if(!res) console.error('There was an error in getting the images.');
				}),
				retryWhen(error => error.pipe(delay(3000), take(5))),
				catchError(this.handleError('getImages'))
			);
	}

	/** @function handleError - Error handler */
	private handleError<T>(operation = 'operation', result?: T): (any) => Observable<T> {
		return (error: any): Observable<T> => {
			console.error(`[FlickrService.${operation}()] Error: ${error.message}`);
			return of(result as T);
		};
	}
}
