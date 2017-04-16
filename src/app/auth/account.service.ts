import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthServerProvider } from './auth-jwt.service'

@Injectable()
export class AccountService {
	backEnd: string = "http://localhost:8080";
	jwt: string;
	headers: Headers;
	
    constructor(private http: Http, private authServerProvider: AuthServerProvider) {
    	this.jwt = authServerProvider.getToken();
    	this.headers = new Headers();
    	this.headers.append('Authorization', 'Bearer '+this.jwt);
    }

    get(): Observable<any> {
        return this.http.get(this.backEnd + '/api/account', {
													        	headers: this.headers 
													        }).map((res: Response) => res.json());
    }

    save(account: any): Observable<Response> {
        return this.http.post(this.backEnd + '/api/account', account);
    }
}