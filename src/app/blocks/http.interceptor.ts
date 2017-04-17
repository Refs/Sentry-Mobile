import { Http, RequestOptionsArgs } from '@angular/http'
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage'

export class HttpInterceptor {
	options: RequestOptionsArgs;
	localStorage: LocalStorageService;
	sessionStorage: SessionStorageService;

	constructor() {
		this.localStorage = new LocalStorageService();
		this.sessionStorage = new SessionStorageService();
	}

	getHttpOptions(): RequestOptionsArgs {
		let token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
		this.options.headers.append('Authorization', 'Bearer ' + token);
		return this.options;
	}
}