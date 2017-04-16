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
			let bearerToken = res._body;
			console.log(res.headers.get('Authorization'));
			console.log(res.headers.get('Connection'));
			console.log(res.headers.get('Vary'));
			console.log(res.headers.get('Access-Control-Allow-Origin'));
			console.log(res._body.slice(19, res._body.length-4), "< TOKEN");
			if (bearerToken) {
				console.log("will store Token!!");
				let jwt = bearerToken.slice(19, bearerToken.length-4);
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