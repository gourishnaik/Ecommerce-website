import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { checkout, cart,product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalprice: number | undefined;
  cartdata: cart[] | undefined;
  productdata: undefined | product;
  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.product.currentcart().subscribe((result) => {
      console.log(result);

      let price = 0;
      this.cartdata = result; //passing result in cart data

      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.fullprice)
        }
      })
      this.totalprice = price + (10 / 100 * price) - (5 / 100 * price) + 40;
      // console.log("price is",this.totalprice)
    })
  }


  ordernow(data: checkout) {
    //console.log(data)
    let user = localStorage.getItem('user');
    let userid = user && JSON.parse(user);
   
    if (this.totalprice) {
      let orderdata: checkout = {
        ...data,  //spread
        totalprice: this.totalprice,
        userid,
        id: undefined,
        
        
      }
     //make cart data 0
     this.cartdata?.forEach((item) => {

       setTimeout(() => {
         item.id && this.product.deleteCartItems(item.id)
       }, 700);

     })
      
      //api
      this.product.ordernow(orderdata).subscribe((result => {
        //console.log(result)
        if (result) {
          alert("Order has been placed successfully!!!")
          setTimeout(() => {
            this.router.navigate(['/my-orders'])
           // this.router.navigate(['/success-order'])
          },1500);
          
        }
      }))
    }
  }

  clickme(){
    
    this.router.navigate(['/success-order'])
  }
}
