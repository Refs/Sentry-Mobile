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
		this.accountService.get().toPromise().then(account => {
			this.account = account;
		});
	}
}