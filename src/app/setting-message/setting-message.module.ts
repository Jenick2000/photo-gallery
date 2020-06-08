import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingMessagePageRoutingModule } from './setting-message-routing.module';

import { SettingMessagePage } from './setting-message.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingMessagePageRoutingModule
  ],
  declarations: [SettingMessagePage]
})
export class SettingMessagePageModule {}
