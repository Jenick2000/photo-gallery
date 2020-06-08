import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {  Router} from '@angular/router';
import {ChatDataService} from './services/chat-data.service';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router, public chatService: ChatDataService
  ) {
    this.initializeApp();
    this.loadApp();
    if (!chatService.UserLogin) {
      this.router.navigate(['/login']);
    }
  }
  loadApp() {
   const checked = localStorage.getItem('darkMode');
   if (checked === 'true') {
    $('body').addClass('dark');
   } else {
     $('body').removeClass('dark');
   }
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
