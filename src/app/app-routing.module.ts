import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '', redirectTo: 'login' , pathMatch: 'full'
  // },
  {
     path: '',
     loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'chat-screen',
    loadChildren: () => import('./chat-screen/chat-screen.module').then( m => m.ChatScreenPageModule)
  },
  {
    path: 'settingmessage',
    loadChildren: () => import('./setting-message/setting-message.module').then( m => m.SettingMessagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
