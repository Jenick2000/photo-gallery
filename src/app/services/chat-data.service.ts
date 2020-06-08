import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {  map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChatDataService {
  Users: any;
  UsersRef: AngularFireList < any > = null;
  ChatsRef: AngularFireList < any > = null;
  Chats: any;
  chatId = null;
  chatMessages: any;
  userFriend: any;
  UserLogin: any;
  conversationNew = false;
  newChat = {
    lastMessageSent: null,
    members: [],
  };
  constructor(public db: AngularFireDatabase) {
    // get users chat
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
       this.Users = user ;
    });
    // get chats data
    this.getChatsData();
   }
   getChatsData() {  // lay tat ca du lieu
    this.ChatsRef = this.db.list('Chats');
    this.ChatsRef.snapshotChanges()
    .pipe(map(items => {
      return items.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {
            key, ...data
        }; // or {key, ...data} in case data is Obj
    });
    })).subscribe(chat => {
      this.Chats = chat;
    });
    }
       // get id cuoc chat giua cac thanh vien
       getChats(id) {
         // get user chatting
         this.chatId = null;
         this.userFriend = this.Users.find(u => u.id === id);
         this.Chats.forEach(element => {
           if (element.members[0] === id && element.members[1] === this.UserLogin.id
            || element.members[1] === id && element.members[0] === this.UserLogin.id) {
              this.chatId = element.key; // gan key cua cuoc hoi thoai
              console.log(' id cua cuoc hoi thoai ' + this.chatId);
           }
         });
      }
      createNewChats(data) {
        this.newChat = {
          lastMessageSent : data.message,
          members : [this.UserLogin.id, this.userFriend.id],
         };
        this.db.list('Chats').push(this.newChat);
        this.ChatsRef = this.db.list('Chats');
        this.ChatsRef.snapshotChanges()
          .pipe(map(items => {
            return items.map(a => {
              const datas = a.payload.val();
              const key = a.payload.key;
              return {
                  key, ...datas
              };
          });
          })).subscribe(chat => {
          const getchatid = chat.find(c => c.members[0] === this.UserLogin.id && c.members[1] === this.userFriend.id);
          this.chatId = getchatid.key;
          this.conversationNew = true;
          });
        setTimeout(() => {
          const itemsRef = this.db.list('chatMessages/' + this.chatId);
          itemsRef.push(data);
          }, 500);

      }
      // push new message
      newchatMessage( data) {
        if ( this.chatId === null) { // kiem tra giua hai nguoi co nhan tin voi nhau chua de tao moi
          this.createNewChats(data);
          console.log('tao cuoc noi chuyen moi');
        } else {
        const itemsRef = this.db.list('chatMessages/' + this.chatId);
        itemsRef.push(data);
        }
      }
      // login
       login(email, password) {
        this.UsersRef = this.db.list('Users');
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
           this.UserLogin =  user.find(u => u.userEmail === email && u.password === password);
        });
       }
}
