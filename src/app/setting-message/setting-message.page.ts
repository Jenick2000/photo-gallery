import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-setting-message',
  templateUrl: './setting-message.page.html',
  styleUrls: ['./setting-message.page.scss'],
})
export class SettingMessagePage implements OnInit {
  themeDark = '';
  constructor(private location: Location) {
    this.themeDark = localStorage.getItem('darkMode');
  }

  backClicked() {
    this.location.back();
  }
  change(e) {
    localStorage.setItem('darkMode', e.detail.checked);
    $('body').toggleClass('dark', e.detail.checked);
  }
  ngOnInit() {
  }

}
