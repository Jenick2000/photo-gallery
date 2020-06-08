import { Component, OnInit  } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { ChatScreenPage} from '../chat-screen/chat-screen.page';
import {ChatDataService} from '../services/chat-data.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {  map} from 'rxjs/operators';
declare var $: any;
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page  implements OnInit {

  public chatData: Array<any>;
  Users: any;
  User: any; // nguoi dung dang co phien dang nhap
  UsersRef: AngularFireList < any > = null;
  lastMessage: any;
  constructor(public modalController: ModalController, chatservises: ChatDataService, db: AngularFireDatabase) {
    this.User = chatservises.UserLogin;
    this.UsersRef = db.list('Users');
    this.UsersRef.snapshotChanges()
    .pipe(map(items => { // <== new way of chaining
        return items.map(a => {
            const data = a.payload.val();
            const key = a.payload.key;
            return {
                key, ...data
            }; // or {key, ...data} in case data is Obj
        });
    })).subscribe(user => {
       this.Users = user.filter(u => u.id !== this.User.id); // lay danh sach ban be
    });
    // bat online true khi nguoi dung vao ung dung
    db.list('Users').update(this.User.id, {online: true});
    $(window).on('beforeunload', () => {
      db.list('Users').update(this.User.id, {online: false});
     });
  }

  ngOnInit() {
    this.chatData = [{
       name: 'Jovenica',
      image: '../assets/chat/user.jpeg',
      description: 'Lorem ipsum dolor sit,  sapiente!',
      status: 'online',
      count: '2',
      time: '2 min ago',
    },
    {
      name: 'Jenick',
     image: '../assets/chat/user1.jpeg',
     description: 'Lorem ipsum dolor sit,  sapiente!',
     status: 'online',
     count: '5',
     time: '5 min ago',
   },
   {
     name: 'Ekoize',
    image: '../assets/chat/user2.jpeg',
    description: 'Lorem ipsum dolor sit,  sapiente!',
    status: 'offline',
    count: '5',
    time: '15 min ago',
  },
  {
    name: 'Lee',
   image: '../assets/chat/user3.jpeg',
   description: 'Lorem ipsum dolor sit,  sapiente!',
   status: 'offline',
   count: '5',
   time: '5 min ago',
 },
 {
   name: 'Ekoize',
  image: '../assets/chat/chat1.jpg',
  description: 'Lorem ipsum dolor sit,  sapiente!',
  status: 'online',
  count: '5',
  time: '15 min ago',
},
{
  name: 'Jenick',
 image: '../assets/chat/chat2.jpg',
 description: 'Lorem ipsum dolor sit,  sapiente!',
 status: 'online',
 count: '5',
 time: '5 min ago',
},
{
 name: 'Ekoize',
image: '../assets/chat/user4.jpeg',
description: 'Lorem ipsum dolor sit,  sapiente!',
status: 'offline',
count: '5',
time: '15 min ago',
}] ;
  }
  async chatScreen(Id) {
    console.log(' id cua friend : ' + Id);
    const modal = await this.modalController.create({
      component: ChatScreenPage,
      componentProps: {
        id: Id
      }
    });
    return await modal.present();
  }
}
