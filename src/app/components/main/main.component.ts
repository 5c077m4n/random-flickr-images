import {
	Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy
} from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';

import { FlickrService } from '../../services/flickr.service';


@Component({
	selector: 'app-main',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
	private listener: Subscription;
	constructor(
		private cdr: ChangeDetectorRef,
		private flickr: FlickrService,
	) {
		this.listener = new Subscription();
	}
	ngOnInit() {
		this.listener.add(this.image$.subscribe());
	}

	public get image$(): Observable<any> {
		const source$ = this.flickr.getImageFeed()
			.pipe(
				tap(console.log),
				tap(_ => this.cdr.detectChanges()),
			);
		return interval(5000)
			.pipe(switchMap(_ => source$));
	}

	ngOnDestroy(): void {
		this.listener.unsubscribe();
	}
}
