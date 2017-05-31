import { Component, OnInit } from '@angular/core';
import { AccountService } from '../auth/account.service';

@Component({
	selector: 'sentry-dashboard',
	templateUrl: 'dashboard.html'
})
export class DashboardComponent implements OnInit {
	
	account;

	constructor(private accountService: AccountService){}

	ngOnInit() {
		this.getAccount();
	}

	getAccount() {
		this.accountService.get().toPromise().then(account => {
			this.account = account;
		});
	}

	hasAuthority(authority) {
		if(this.account){
			for(var i = 0; i < this.account.authorities.length; i++) {
				if(this.account.authorities[i] === authority) {
					return true;
				}
			}
			return false;
		}
	}
}