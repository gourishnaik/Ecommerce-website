import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { login, signup } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invaliduserauth = new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router) { }
  usersignup(user: signup) {
    this.http.post("http://localhost:3000/user", user, { observe: 'response' })
      .subscribe((result) => {
        // console.log("full result is",result);
        //  console.log("body is",result.body);

        //******************************STORE DATA IN LOCAL STORAGE**********************************
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }

      })
  }
  //user login
  userlogin(data: login) {
    this.http.get<signup[]>(`http://localhost:3000/user?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .subscribe((result) => {
        // console.log(result.body)
        if (result && result.body && result.body.length == 1) {
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
          this.invaliduserauth.emit(false)
        }else{
          this.invaliduserauth.emit(true)
        }
      })
  }
  //on reload  to avoid user to go in signup page when he is logged in and take him to home page
  userauthreload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/'])
    }
  }
}
