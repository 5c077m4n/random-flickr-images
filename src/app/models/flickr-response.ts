import { FeedItem } from './feed-item';


export interface FlickrResponse {
	title: string;
	link: string;
	description: string;
	modified: Date;
	generator: string;
	items: FeedItem[];
}
