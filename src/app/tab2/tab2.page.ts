import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { ToastController, ModalController, AlertController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { ModalPage} from '../modal/modal.page';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  items  = ['Orange', 'Dark', 'Sky'] ;
  goiy = [] ;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  constructor(public modalController: ModalController,
              private storage: AngularFireStorage,
     // tslint:disable-next-line: align
     public toastController: ToastController, public alertController: AlertController , public  photoService: PhotoService) { }
  // tslint:disable-next-line: use-lifecycle-interface
    uploadFile(event) {
      const file = event.target.files[0];
      const filePath = 'name-your-file-path-here';
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      // observe percentage changes
      this.uploadPercent = task.percentageChanges();
      // get notified when the download URL is available
      task.snapshotChanges().pipe(
          finalize(() => this.downloadURL = fileRef.getDownloadURL() )
      )
      .subscribe();
    }
   ngOnInit() {
    this.photoService.loadSaved();
    $('#search').focusin( () => {
     const search = $('#search').val();
     $('#keyworkSearch').show();
     $('.gallery').hide();
    });

    $('#search').on('keyup', () => {
      $('.goiy').show() ;
      this.goiy = [] ;
      const searchValue = $('#search').val();
      this.items.forEach(item => {
        const shouldShow = item.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
        if (shouldShow) {  this.goiy.push(item); }
      });
    });
    $('#search').focusout( () => {
     //  $('#keyworkSearch').hide();
      $('.gallery').show();
      $('.goiy').hide();
    });

    $('#dark').on('click', () => {
      $('.result_search').show();
      $('#keyworkSearch').hide();
      $('.gallery').hide();
      $('.goiy').hide();
      $('.delete_btn').hide();
    });
    $('.close_btn').on('click', () => {
      $('.result_search').hide();
      $('.gallery').show();
    });
  }
  deleteGellery() {
    this.photoService.removeGellery();
  }
  // toast
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'deleted all pictures',
      duration: 2000
    });
    toast.present();
  }
  // confirm delete all gellery
  async deleteConfirm() {
    const alert = await this.alertController.create({
      header: 'Are you sure!',
      message: 'this is clear all gallery out libary',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Clear',
          handler: () => {
           this.deleteGellery();
           this.presentToast();
          }
        }
      ]
    });

    await alert.present();
  }
  // modal
  async imageModal(image) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        firstName: 'Lee',
        lastName: 'Jenick',
        urlImage: image,
      }
    });
    return await modal.present();
  }
}
