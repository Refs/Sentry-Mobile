import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpInterceptor } from '../blocks/http.interceptor';
import { SessionStorageService } from 'ng2-webstorage';

@Injectable()
export class AccountService extends HttpInterceptor {
	backEnd: string = "http://localhost:8080";
    sessionStorage:any = new SessionStorageService();

    constructor(private http: Http) {
    	super();
    }

    get(): Observable<any> {
        return this.http.get(this.backEnd + '/api/account', this.getHttpOptions()).map((res: Response) => {
            let response = res.json();
            if(response){
                this.sessionStorage.store('account', response);
                return response;
            }
        });
    }

    save(account: any): Observable<Response> {
        return this.http.post(this.backEnd + '/api/account', account);
    }
}