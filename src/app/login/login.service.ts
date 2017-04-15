import { Injectable } from '@angular/core';
import { AuthServerProvider } from '../auth/auth-jwt.service';
import { Principal } from '../auth/principal.service';

@Injectable()
export class LoginService {
	constructor(private authServerProvider: AuthServerProvider, private principal: Principal){}

	login(credentials) {
		return new Promise((resolve, reject) => {
			this.authServerProvider.login(credentials).subscribe((data) => {
				this.principal.identity(true).then(account => {
					resolve(data);
					console.log(data);
				});
			}, err => {
				this.logout();
				reject(err);
				console.log(err);
			});
		});
	}

	logout () {
        this.authServerProvider.logout().subscribe();
        this.principal.authenticate(null);
    }
}