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
					console.log("login.service > this.principal.identity >> WORKED");
				});
			}, err => {
				this.logout();
				reject(err);
				console.log(err, "Not logging in.");
			});
		});
	}

	logout () {
        this.authServerProvider.logout().subscribe();
        this.principal.authenticate(null);
    }
}