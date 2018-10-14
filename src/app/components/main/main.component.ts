import {
	Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { FlickrService } from '../../services/flickr.service';


@Component({
	selector: 'app-main',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
	public imageList: any[];
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
		return this.flickr.getImages()
			.pipe(
				map(res => res.photo),
				tap(() => this.cdr.detectChanges()),
			);
	}

	ngOnDestroy(): void {
		this.listener.unsubscribe();
	}
}
