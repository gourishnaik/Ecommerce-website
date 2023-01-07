import { Component, OnInit } from '@angular/core';
import { signup } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showlogin: boolean = true;
  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.user.userauthreload();
  }
  signup(data: signup) {
    this.user.usersignup(data)
  }
  login(data: signup) {
    console.log(data)
  }
  openlogin() {
  this.showlogin = true;
  }
  opensignup() {
  this.showlogin = false;
  }

}
