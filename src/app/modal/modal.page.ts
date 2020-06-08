import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
   // Data passed in by componentProps
   @Input() firstName: string;
   @Input() lastName: string;
   @Input() urlimage: string;
  constructor(public modalController: ModalController, navParams: NavParams) {
    this.urlimage = navParams.get('urlImage') || 'https://thuthuatnhanh.com/wp-content/uploads/2019/08/anh-dep-585x329.jpg';
   }
   slidesOps: {
     zoom: {
       maxRatio: 5,
       spaceBettween: 30
     }
   };
  ngOnInit() {
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
