import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingMessagePage } from './setting-message.page';

const routes: Routes = [
  {
    path: '',
    component: SettingMessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingMessagePageRoutingModule {}
