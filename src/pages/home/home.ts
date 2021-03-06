import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../app/login/login.service';
import { AccountService } from '../../app/auth/account.service';
import { Principal } from '../../app/auth/principal.service';
import { NavController, LoadingController, Events } from 'ionic-angular';
import { SessionStorageService } from 'ng2-webstorage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  account;
  hasAccount: boolean = false;

  constructor(public navCtrl: NavController, 
              private principal: Principal, 
              private accountService: AccountService, 
              private loginService: LoginService, 
              private loadingController: LoadingController, 
              private events: Events,
              private sessionStorage:SessionStorageService) {}

  ngOnInit() {
  	this.registerForAuthenticationSuccess();
  }

  registerForAuthenticationSuccess() {
  	this.events.subscribe('authenticationSuccess', () => {
      // this.getAccount();
      let account = this.sessionStorage.retrieve('account');
      if(account) {
        this.account = account;
      } else {
        this.getAccount();
      }
  	});
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  getAccount() {
    this.accountService.get().toPromise().then(account => {
      this.account = account;
      this.hasAccount = true;
    });
  }

  logout() {
  	this.loginService.logout();
    this.events.publish('logoutSuccess');
  }

  
}
