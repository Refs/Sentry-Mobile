import { RequestOptions, Headers } from '@angular/http'
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage'

export class HttpInterceptor {
	options: RequestOptions;
	localStorage: LocalStorageService;
	sessionStorage: SessionStorageService;

	constructor() {
		this.localStorage = new LocalStorageService();
		this.sessionStorage = new SessionStorageService();
	}

	getHttpOptions(): RequestOptions {
		this.options = new RequestOptions({headers: new Headers()});
		let token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');

		if( token ) {
			this.options.headers.append('Authorization', 'Bearer ' + token);
		}
		
		return this.options;
	}
}