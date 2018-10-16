import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, retryWhen, delay, take, switchMap, map } from 'rxjs/operators';

import { JsonResponse } from '../models/json-response';


@Injectable({ providedIn: 'root' }) export class FlickrService {
	// private readonly key = '04123b5d9f451345746a0e32c49fcd56';
	// private readonly secret = 'e52d61410b701af9';
	private readonly xmlToJsonUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
	private readonly flickrRssUrl = 'https://api.flickr.com/services/feeds/photos_public.gne';
	constructor(private http: HttpClient) {}

	public getImageFeed(): Observable<any> {
		return this.http.get(this.xmlToJsonUrl + this.flickrRssUrl)
			.pipe(
				tap((res: JsonResponse) => {
					if(!(res && res.status)) console.error(
						'There was an error in getting the auth token.'
					);
				}),
				retryWhen(error => error.pipe(delay(1000), take(5))),
				catchError(this.handleError('getAuthToken')),
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
