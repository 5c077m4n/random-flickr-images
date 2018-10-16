import {
	Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy
} from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { tap, map, switchMap, startWith } from 'rxjs/operators';

import { FlickrService } from '../../services/flickr.service';
import { FlickrResponse } from '../../models/flickr-response';
import { FeedItem } from '../../models/feed-item';


@Component({
	selector: 'app-main',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
	public feed: FeedItem[];
	public randInd: number = 0;
	private listener: Subscription;
	constructor(
		private cdr: ChangeDetectorRef,
		private flickr: FlickrService,
	) {}
	ngOnInit() {
		this.listener = this.image$.subscribe();
	}

	public get image$(): Observable<any> {
		const source$ = this.flickr.getImageFeed()
			.pipe(
				tap(console.log),
				map((resp: FlickrResponse) => resp.items),
				tap(feedArr => this.feed = feedArr),
				tap(feedArr => this.randInd = this.randomInteger(0, feedArr.length)),
				tap(_ => this.cdr.detectChanges()),
			);
		return interval(5000)
			.pipe(
				startWith(source$),
				switchMap(_ => source$),
			);
	}

	public get detectRender(): void { console.log('rendered page.'); return; }
	public refreshImage(): void {
		this.randInd = this.randomInteger(0, this.feed.length);
	}
	private randomInteger(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	ngOnDestroy(): void {
		this.listener.unsubscribe();
	}
}
