import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AccountService  {
	backEnd: string = "http://localhost:8080/";
    constructor(private http: Http) { }

    get(): Observable<any> {
        return this.http.get(this.backEnd + 'api/account').map((res: Response) => res.json());
    }

    save(account: any): Observable<Response> {
        return this.http.post(this.backEnd + 'api/account', account);
    }
}