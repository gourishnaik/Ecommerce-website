import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { signup } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private router:Router) { }
  usersignup(user:signup){
  this.http.post("http://localhost:3000/user",user,{observe:'response'})
  .subscribe((result)=>{
    // console.log("full result is",result);
    //  console.log("body is",result.body);
  //******************************STORE DATA IN LOCAL STORAGE**********************************
  if(result){
    localStorage.setItem('user',JSON.stringify(result.body));
    this.router.navigate(['/']);
  }

  })
  }

  //on reload  to avoid user to go in signup page when he is logged in and take him to home page
  userauthreload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }
}
