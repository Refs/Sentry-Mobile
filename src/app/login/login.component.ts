import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Principal } from '../auth/principal.service';
import { NavController, LoadingController } from 'ionic-angular';


@Component({
	selector: 'sentry-login',
	templateUrl: 'login.html',
	styleUrls: []
})
export class LoginComponent implements OnInit {
	isAuthenticated: boolean = false;
	credentials: any;

	constructor(public navCtrl: NavController, private loadingController: LoadingController, private loginService: LoginService,
			private principal: Principal){}

	ngOnInit() {
		this.credentials = {};
	}

	login() {
		let loader = this.loadingController.create({
	  		content: "Signing in...",
	  		duration: 3000
	  	});
	  	loader.present();
	  	if(!this.credentials.rememberMe){
	  		this.credentials.rememberMe = false;
	  	}
	  	this.loginService.login(this.credentials).then(() => {
	  		console.log('Login Success');
	  		this.isAuthenticated = true;
	  	}).catch(() => {
	  		console.log('Login ERROR');
	  		this.isAuthenticated = false;
	  	});
	}
}