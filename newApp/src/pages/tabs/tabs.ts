import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { AccountPage } from '../account/account';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AccountPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
