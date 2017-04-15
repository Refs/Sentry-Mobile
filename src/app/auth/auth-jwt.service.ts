import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthServerProvider {
	
	backEnd: string = 'http://localhost:8080/';

	constructor(private http: Http, private storage: Storage){}

	login(credentials): Observable<any> {
		let data = {
			username: credentials.username,
			password: credentials.password,
			rememberMe: credentials.rememberMe
		};

		return this.http.post(this.backEnd + 'api/authenticate', data).map(authenticateSuccess.bind(this));

		function authenticateSuccess(res) {
			let bearerToken = res.headers.get('Authorization');
			if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
				let jwt = bearerToken.slice(7, bearerToken.length);
				this.storeAuthenticationToken(jwt, credentials.rememberMe);
				return jwt; 
			}
		}
	}
	storeAuthenticationToken(jwt, rememberMe) {
		if(rememberMe){
			this.storage.set('authenticationToken', jwt);
		} else {
			this.storage.set('authenticationToken', jwt);
		}
	}

	logout() {
		return new Observable(observer => {
			this.storage.remove('authenticationToken');
			observer.complete();
		});
	}
}