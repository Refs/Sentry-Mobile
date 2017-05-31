import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { NavController, LoadingController, Events, AlertController } from 'ionic-angular';


@Component({
	selector: 'sentry-login',
	templateUrl: 'login.html',
	styleUrls: []
})
export class LoginComponent implements OnInit {
	isAuthenticated: boolean = false;
	credentials: any;

	constructor(public navCtrl: NavController, private loadingController: LoadingController, private loginService: LoginService,
			private events: Events, private alert: AlertController){}

	ngOnInit() {
		this.credentials = {};
	}

	login() {
		let loader = this.loadingController.create({
	  		content: "Signing in...",
	  		duration: 1200
	  	});
	  	loader.present();

	  	if(!this.credentials.rememberMe){
	  		this.credentials.rememberMe = false;
	  	}

	  	this.loginService.login(this.credentials).then(() => {
	  		this.isAuthenticated = true;
			let alert = this.alert.create({
				title: 'Welcome',
				subTitle: 'Check your duties now!',
				buttons: ['Ok']
			});
			alert.present();
	  		this.events.publish('authenticationSuccess');
	  	}).catch(() => {
	  		let alert = this.alert.create({
				title: 'Invalid Credentials',
				subTitle: 'Failed to sign in!<br> Check your credentials and try again.',
				buttons: ['Ok']
			});
			alert.present();
	  		this.isAuthenticated = false;
	  	});
	}
}