import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { signup } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  showlogin: boolean = false;
  autherror:string='';
  constructor(private seller: SellerService, private router: Router) { }

  ngOnInit(): void {
    this.seller.reloadseller()
  }
  signup(data: signup): void {
    // console.log(data)
    //  this.seller.usersignup(data).subscribe((result:any)=>{
    console.log("post data is", data);
    this.seller.usersignup(data);
    // if(result){
    //   this.router.navigate(['sellerhome'])
    // }  
    // })
  }
  login(data: signup): void {
   // console.log("login  data is", data);
    this.seller.userlogin(data)
    this.seller.isloginerror.subscribe((iserror)=>{
      console.log("data is",iserror)
      if(iserror){
        this.autherror="Email or password is not correct";
      }
    })}
  openlogin() {
    this.showlogin = true;

  }
  closelogin() {
    this.showlogin = false;
  }

}
