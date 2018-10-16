import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, retryWhen, delay, take, map } from 'rxjs/operators';

import { FlickrResponse } from '../models/flickr-response';


@Injectable({ providedIn: 'root' }) export class FlickrService {
	private readonly flickrRssUrl = 'https://api.flickr.com/services/feeds/photos_public.gne';
	constructor(private http: HttpClient) {}

	public getImageFeed(): Observable<any> {
		return this.http.jsonp<any>(`${this.flickrRssUrl}?format=json`, 'jsoncallback')
			.pipe(
				tap((res: FlickrResponse) => {
					if(!res) console.error(
						'There was an error in getting the auth token.'
					);
				}),
				retryWhen(error => error.pipe(delay(10000), take(5))),
				catchError(this.handleError('getAuthToken', {})),
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
