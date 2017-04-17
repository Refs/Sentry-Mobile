import { Component, OnInit } from '@angular/core';
import { Principal } from '../../app/auth/principal.service';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = ProfilePage;

  constructor(private principal: Principal, private events: Events) {

  }

  ngOnInit() {
  	// this.registerForLogout();
  }

  // registerForLogout() {
  // 	this.events.subscribe('logoutSuccess', () => {
  //     this.isAuthenticated();
  // 	});
  // }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }
}
