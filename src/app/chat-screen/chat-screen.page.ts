import { Component, OnInit, Input } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {ChatDataService} from '../services/chat-data.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {  map} from 'rxjs/operators';
declare var $: any;
@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.page.html',
  styleUrls: ['./chat-screen.page.scss'],
})
export class ChatScreenPage implements OnInit {
  @Input() id: string;
  users: any;
  User: any;
  ChatMessages: any;
  sender: any;
  limitMessage = 10;
  allMessageChatsRef: AngularFireList < any > = null;
  countAllMessage = 0;
  Typing: any;
  isTyping = 0;
  like = 1;
  dataSticker: any;
  data =
    {
      message: null ,
      sentBy: null,
      messageTime : new Date().toString(),
      sticker: 0,
    };
  constructor(
    public modalCtrl: ModalController,
    navParams: NavParams,
    public chatservises: ChatDataService,
    public db: AngularFireDatabase) {
    this.id = navParams.get('id');
    // lay thong tin nguoi dung
    this.User = chatservises.UserLogin;
    chatservises.getChats(this.id);
    db.list('chatMessages/' + chatservises.chatId , ref => ref.limitToLast(this.limitMessage)).valueChanges()
    .subscribe(c => { this.ChatMessages = c; });
    this.sender =  chatservises.userFriend;
    // get all messages
    this.allMessageChatsRef = db.list('chatMessages/' + chatservises.chatId);
    this.allMessageChatsRef.snapshotChanges()
    .pipe(map(items => {
      return items.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {
            key, ...data
        }; // or {key, ...data} in case data is Obj
    });
    })).subscribe(chat => {
      this.countAllMessage = chat.length; // get count conv
    });
    // user typing in message input
    if (this.chatservises.chatId) {
    this.db.list('Chats/' + this.chatservises.chatId + '/' + this.id).valueChanges()
    .subscribe( c => {
      this.Typing = c;
      console.log('dang go');
      setTimeout(() => {this.isTyping = this.Typing[0]; });
    } );
    // get sticker strorage in cloud storage in firebase
    this.dataSticker = db.list('Sticker').valueChanges();
  }
    $(window).on('beforeunload', () => {
      this.updateTyping(0);
    });
    $(document).on('keypress', (e) => {
      if (e.which === 13 && this.data.message !== null && $('#typeMessage').val().trim().length > 0) {
          this.newChatMessage();
          this.like = 1;
      }
  });
  }
  ngOnInit() {
    setTimeout(() => {
     this.scrollToNewMessage();
     }, 500) ;
    // this.loadOldMessages();
  }
  // chuc nang cuon xuong bottom
  scrollToNewMessage() {
    const height = document.getElementById('chat-container').clientHeight;
    document.getElementById('chat-parent').scrollTop = height;
  }
  // loadOldMessages() {
  //   $('#chat-parent').bind('scroll', (event) => { // bat su kien cuon man hinh
  //     // if (event.originalEvent.wheelDelta >= 0) {
  //     //     console.log('Scroll up ' + $('#chat-parent').scrollTop());
  //         if ($('#chat-parent').scrollTop() === 0 && this.limitMessage <= this.countAllMessage) {
  //           console.log('load old data');
  //           this.limitMessage += 10; // get old message
  //           this.getConversation();
  //         }
  //     // } else {
  //     //     console.log('Scroll down');
  //     // }
  //   });
  // }
  doRefresh(event) {
    setTimeout(() => {
      this.limitMessage += 10; // get old message
      this.getConversation();
      event.target.complete();
    }, 1000);
  }
  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
  checkFocus() {
    console.log('on focus');
    this.updateTyping(1);
  }
  checkBlur() {
    console.log('on blur');
    this.updateTyping(0);
  }
  checkInput() {
    if ($('#typeMessage').val().trim().length > 0) {
     this.like = 0;
    } else  {
      this.like = 1;
    }
  }
  updateTyping(type: number) {
    if (this.chatservises.chatId) {
    const itemsRef = this.db.list('Chats/' + this.chatservises.chatId );
    itemsRef.update(this.User.id, { isTyping: type } );
    } else {
      console.log('on focus null rui');
    }
  }
  sticker() {
    $('#myTabSticker').toggle();
  }
  getConversation() {
    this.db.list('chatMessages/' + this.chatservises.chatId , ref => ref.limitToLast(this.limitMessage)).valueChanges()
          .subscribe(c => {this.ChatMessages = c; });
  }
  newChatMessage() {
      this.data.sentBy = this.User.id;
     // this.data.messageTime = "Wed Oct 05 2011 21:48:00 GMT+0700 (Indochina Time)";
      console.log(this.data.messageTime)
      this.chatservises.newchatMessage(this.data);
      setTimeout(() => {
        this.data.message = null;
        if ( this.chatservises.conversationNew === true ) { // load lai tin nhan dau tien
          this.getConversation();
          this.chatservises.conversationNew = false;
        }
      }, 500);
      this.scrollToNewMessage();
      this.like = 1;
  }
  newChatLike() {
    this.data.sentBy = this.User.id;
    this.data.message = 'like';
    this.chatservises.newchatMessage(this.data);
    setTimeout(() => {
      this.data.message = null;
      if ( this.chatservises.conversationNew === true ) { // load lai tin nhan dau tien
        this.getConversation();
        this.chatservises.conversationNew = false;
        this.like = 1 ;
      }
    }, 500);
    this.scrollToNewMessage();
  }
  chatSticker(urlSticker) {
    this.data.sticker = 1;
    this.data.sentBy = this.User.id;
    this.data.message = urlSticker;
    this.chatservises.newchatMessage(this.data);
    setTimeout(() => {
      this.data.message = null;
    }, 500);
    this.scrollToNewMessage();
    $('#myTabSticker').hide();
  }
   formatDate(date) {
     
    date = new Date(date);
    if( date == "Invalid Date") return "";
    let ngay;
    ngay = new Date();
    let diff = ngay - date; // the difference in milliseconds
  
    if (diff < 1000) { // less than 1 second
      return 'right now';
    }
  
    let sec = Math.floor(diff / 1000); // convert diff to seconds
  
    if (sec < 60) {
      return sec + ' sec. ago';
    }
  
    let min = Math.floor(diff / 60000); // convert diff to minutes
    if (min < 60) {
      return min + ' min. ago';
    }
  
    // format the date
    // add leading zeroes to single-digit day/month/hours/minutes
    let d = date;
    d = [
      '0' + d.getDate(),
      '0' + (d.getMonth() + 1),
      '' + d.getFullYear(),
      '0' + d.getHours(),
      '0' + d.getMinutes()
    ].map(component => component.slice(-2)); // take last 2 digits of every component
  
    // join the components into date
    return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
  }
  
}
