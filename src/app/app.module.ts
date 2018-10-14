import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppStylesModule } from './app-styles.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		AppStylesModule,
		BrowserAnimationsModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
