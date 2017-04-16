import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../app/auth/account.service';
import { Principal } from '../../app/auth/principal.service';
import { NavController, Events } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit{
  account;

  constructor(public navCtrl: NavController, private principal: Principal, private accountService: AccountService, private events: Events) {

  }

  ngOnInit() {
    this.getAccount();
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
