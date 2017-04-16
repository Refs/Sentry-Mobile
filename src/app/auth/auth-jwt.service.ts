import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';

@Injectable()
export class AuthServerProvider {
	
	backEnd: string = 'http://localhost:8080';

	constructor(private http: Http, private storage: Storage, private localStorage: LocalStorageService, private sessionStorage: SessionStorageService){
	}

	getToken () {
        return this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
    }

	login(credentials): Observable<any> {
		let data = {
			username: credentials.username,
			password: credentials.password,
			rememberMe: credentials.rememberMe
		};


		return this.http.post(this.backEnd + '/api/authenticate', data).map(authenticateSuccess.bind(this));

		function authenticateSuccess(resp) {
			let bearerToken = resp.json();
			if (bearerToken && bearerToken.id_token) {
				let jwt = bearerToken.id_token;
				this.storeAuthenticationToken(jwt, credentials.rememberMe);
				return jwt; 
			}
		}
	}
	storeAuthenticationToken(jwt, rememberMe) {
		if(rememberMe){
			// this.storage.set('authenticationToken', jwt);
			this.localStorage.store('authenticationToken', jwt);
		} else {
			// this.storage.set('authenticationToken', jwt);
			this.sessionStorage.store('authenticationToken', jwt);
		}
	}

	logout() {
		return new Observable(observer => {
			// this.storage.remove('authenticationToken');
			this.localStorage.clear('authenticationToken');
			this.sessionStorage.clear('authenticationToken');
			observer.complete();
		});
	}
}