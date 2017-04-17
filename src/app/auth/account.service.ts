import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpInterceptor } from '../blocks/http.interceptor';

@Injectable()
export class AccountService extends HttpInterceptor {
	backEnd: string = "http://localhost:8080";

    constructor(private http: Http) {
    	super();
    }

    get(): Observable<any> {
        return this.http.get(this.backEnd + '/api/account', this.getHttpOptions()).map((res: Response) => res.json());
    }

    save(account: any): Observable<Response> {
        return this.http.post(this.backEnd + '/api/account', account);
    }
}