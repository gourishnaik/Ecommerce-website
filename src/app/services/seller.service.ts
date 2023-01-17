import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signup } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http: HttpClient, private router: Router) { }
  issellerloggedin = new BehaviorSubject<boolean>(false);
  isloginerror     = new BehaviorSubject<boolean>(false);
  //post method
  usersignup(data: signup) {
    return this.http.post('http://localhost:3000/seller', data,
      { observe: 'response' }).subscribe((result: any) => {
        console.log(result)
        if (result) {
          this.issellerloggedin.next(true);
          localStorage.setItem('seller', JSON.stringify(result.body))
          this.router.navigate(['sellerhome'])
        }
      })
  }

  //refresh main function says if seller localstroage present seller logged in is true
  reloadseller() {
    if (localStorage.getItem('seller')) {
      this.issellerloggedin.next(true);
      this.router.navigate(['sellerhome'])
    }
  }

  //user login get method 
  userlogin(data: login) {
    // console.log(data);
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
      {observe: 'response'}).subscribe((result: any) => {
        console.log(result);
        if (result && result.body && result.body.length == 1) {
          this.isloginerror.next(false);
          localStorage.setItem('seller', JSON.stringify(result.body))
          this.router.navigate(['sellerhome'])
        } else {
              console.warn("login failed")
              this.isloginerror.next(true);
        }
      })

  }
}
