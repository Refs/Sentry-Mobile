import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../app/login/login.service';
import { NavController, LoadingController, Events } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  isAuthenticated: boolean = false;

  constructor(public navCtrl: NavController, private loginService: LoginService, private loadingController: LoadingController, private events: Events) {

  }

  ngOnInit() {
  	this.registerForAuthenticationSuccess();
  }

  registerForAuthenticationSuccess() {
  	this.events.subscribe('authenticationSuccess', () => {
  		this.isAuthenticated = true;
  	});
  }

  logout() {
  	this.loginService.logout();
  	this.isAuthenticated = false;
  }

  
}
