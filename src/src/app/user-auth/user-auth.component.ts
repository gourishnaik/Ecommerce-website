import { Component, OnInit } from '@angular/core';
import { cart, product, signup } from '../data-type';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showlogin: boolean = true;
  autherror: string = "";
  constructor(private user: UserService, private product: ProductService) { }

  ngOnInit(): void {
    this.user.userauthreload();
  }
  signup(data: signup) {
    this.user.usersignup(data)
  }
  login(data: signup) {
    //  console.log(data)
    this.user.userlogin(data);
    this.user.invaliduserauth.subscribe((result) => {
      console.log(result)
      if (result) {
        this.autherror = "user not found!!"
      } else {
        this.localcarttoremotecart();
      }
    })

  }

  openlogin() {
    this.showlogin = true;
  }
  opensignup() {
    this.showlogin = false;
  }

  localcarttoremotecart() {
    let data = localStorage.getItem('localcart');
    let user = localStorage.getItem('user');
    let userid = user && JSON.parse(user).id;

    if (data) {
      let cartdatalist: product[] = JSON.parse(data);  //object to string
      // let user = localStorage.getItem('user');
      // let userid = user && JSON.parse(user).id;

      cartdatalist.forEach((product, index) => {
        let cartdata: cart = {
          ...product,
          productid: product.id,
          userid
        }
        delete cartdata.id;
        setTimeout(() => {
          this.product.addtocart(cartdata).subscribe((res) => {
            if (res) {
              console.log("data stored in db");
            }
          })
        }, 4000);
        
        if (cartdatalist.length === index + 1) {
          localStorage.removeItem('localcart');
        }

      })
    }
    setTimeout(() => {
      this.product.getcartlist(userid)
    }, 2000);
   
  }
}
