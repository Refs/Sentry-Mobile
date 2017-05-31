import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../app/auth/account.service';
import { Principal } from '../../app/auth/principal.service';
import { NavController, Events } from 'ionic-angular';
import { SessionStorageService } from 'ng2-webstorage';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit{
  account;

  constructor(public navCtrl: NavController, private sessionStorage: SessionStorageService, private principal: Principal, private accountService: AccountService, private events: Events) {

  }

  ngOnInit() {
      let account = this.sessionStorage.retrieve('account');
      if(account) {
        this.account = account;
      } else {
        this.getAccount();
      }
    // this.getAccount();
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  getAccount() {
    this.accountService.get().toPromise().then(account => {
      this.account = account;
    });
  }

  
}
