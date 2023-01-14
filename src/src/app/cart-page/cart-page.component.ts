import { Component, OnInit } from '@angular/core';
import { cart, pricesummary } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartdata: cart[];
  pricesummary: pricesummary = {
    price: 0,
    discount: 0,
    tax: 0,
    dilevery: 0,
    total: 0
  }
  constructor(private product: ProductService) { }

  ngOnInit(): void {
   this.loaddetails();   
  }
 

   loaddetails(){
    this.product.currentcart().subscribe((result) => {
      this.cartdata = result;
      console.log(this.cartdata);
      // to get price of each we will use foreach
         let price=0; 
         var prices =0
         result.forEach((item)=>{
         if(item.quantity){
          price = price+ (+item.price * + item.quantity);
         }
         
         }) 
        // console.log(price)
        this.pricesummary.price = price;
        this.pricesummary.tax   = 10/100*price;     // 10% percent gst
        this.pricesummary.discount = 5/100*price; // 5% percent discount
        this.pricesummary.dilevery = 40;
        this.pricesummary.total = price+(10/100*price)-(5/100*price)+40;
        //console.log("total is", this.pricesummary.total)
        //console.log("total is", this.pricesummary)
    })
   }
   delete(cartid:number|any){
    this.cartdata &&  this.product.deleteCartItems(cartid)
     this.loaddetails()  
     
     }

}
