import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productdata: undefined | product;
  productquantity: number = 1;
  removecart=false;
  quantityreached:string;
  cartdata:undefined|product;
  constructor(private activeroute: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let productid = this.activeroute.snapshot.paramMap.get('productid');
   // console.log("product id is", productid);
    productid && this.product.getproductbyid(productid).subscribe((res) => {
      this.productdata = res;
   // for remove to cart
     let cartdata = localStorage.getItem('localcart');
     if (productid && cartdata){      //if present in localdata 
        let items =JSON.parse(cartdata);
        items = items.filter((item:product)=>
        productid=== item.id.toString());
        console.log("items are",items);
        if(items.length){
        this.removecart = true;
        }else{
          this.removecart = false;
        }
     }
//display before refresh
       let user = localStorage.getItem('user');
       if(user){
        let userid = user && JSON.parse(user).id;
        this.product.getcartlist(userid);

        this.product.cartdata.subscribe((res=>{
          let item = res.filter((item:product)=>productid?.toString()===item.productid?.toString() )
          if(item.length){
            this.cartdata=item[0];
            this.removecart = true;
          }
        }))
       }
    })
  }
  handlequantity(val: string) {
    if (this.productquantity < 5 && val == "max") {
      this.productquantity += 1;
     
    }else if(this.productquantity>1  && val == "min") {
      this.productquantity -= 1;
    }
    
    if(this.productquantity==5){
      this.quantityreached = "Maximum quanity reached"
      setTimeout(() => {
        this.quantityreached = ""
      }, 3000);
 
    }
 
  }
  addtocart(){
   //console.log(this.productdata)
   if(this.productdata){
    this.productdata.quantity = this.productquantity;
    this.productdata.fullprice =  this.productdata.price*this.productquantity;
    console.log(this.productdata.fullprice)
    if(!localStorage.getItem('user')){
       this.product.localaddtocart(this.productdata)
       this.removecart = true;
    }else{
     // console.log("user is logged in !!")
      let user = localStorage.getItem('user');
      //let userid = user && JSON.parse(user);
      let userid = user && JSON.parse(user).id;
     // console.log("user id is",userid);
      let cartdata:cart={
        ...this.productdata,
        userid,
        productid: this.productdata.id
        
      }
      delete cartdata.id;  // to remove cartdata.id which we dont need
      console.log(cartdata)
      this.product.addtocart(cartdata).subscribe((res)=>{
       if(res){
      //  alert("product is added in cart!!!")
        this.product.getcartlist(userid)
        this.removecart = true;
       }
      })
    }
    
   }
  }
  removetocart(productid:number){
    if(!localStorage.getItem('user')){
  this.product.removeitem(productid);
  this.removecart = false;
  }else{
   this.cartdata && this.product.removetocart(this.cartdata.id).subscribe((result)=>{
    let user = localStorage.getItem('user');
    let userid = user && JSON.parse(user).id;
    this.product.getcartlist(userid);
    this.removecart = false;
   })
  }
}
}
