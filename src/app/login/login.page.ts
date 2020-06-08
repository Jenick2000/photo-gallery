import { Component, OnInit } from '@angular/core';
import {  Router} from '@angular/router';
import {ChatDataService} from '../services/chat-data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  constructor(private router: Router, public chatService: ChatDataService) { }

  ngOnInit() {
  }
  processForm() {
    this.chatService.login(this.email, this.password);
    if (this.chatService.UserLogin) {
    this.router.navigate(['']);
    }
  }
}
