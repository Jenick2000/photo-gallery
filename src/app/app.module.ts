import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalPage} from './modal/modal.page';
import { ChatScreenPage} from './chat-screen/chat-screen.page';
@NgModule({
  declarations: [AppComponent, ModalPage, ChatScreenPage],
  entryComponents: [ModalPage, ChatScreenPage],
  imports: [BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'my-app-message'),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(),
  FormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy  },
    { provide: StorageBucket, useValue: 'gs://message-6c6fa.appspot.com' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
