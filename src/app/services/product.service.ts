import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, checkout, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartdata = new EventEmitter<product[] |[]>()
  constructor(private http: HttpClient) { }

  addproduct(data: product) {
    console.log("service is called")
    return this.http.post("http://localhost:3000/products", data)
  }

  productlist() {
    return this.http.get<product[]>("http://localhost:3000/products");
  }

  deleteproduct(id: number) {
    return this.http.delete("http://localhost:3000/products/" + id)
  }
  //on edit
  getproductbyid(id: string) {
    return this.http.get<product>("http://localhost:3000/products/" + id)  //<product> because we want single id
  }

  //update product single product

  updateproduct(product: product) {
    return this.http.put<product>("http://localhost:3000/products/" + product.id, product)
  }

  // carousel products with 4 limits
  popularproducts() {
    return this.http.get<product[]>("http://localhost:3000/products?_limit=4")
  }
  // small products display just product limit we are making 8
  trendyproducts() {
    return this.http.get<product[]>("http://localhost:3000/products?_limit=8");
  }
   // search product in search bar
  searchproduct(query:string){
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
  }
  //add  to cart
  
  localaddtocart(data:product){
   let cartdata = [];
   let localcart = localStorage.getItem('localcart');
   
   if(!localcart){
    localStorage.setItem('localcart',JSON.stringify([data]));
    this.cartdata.emit([data]);
   }else{
    //console.log("you already have data")
    cartdata = JSON.parse(localcart);
    cartdata.push(data);
    localStorage.setItem('localcart',JSON.stringify(cartdata));
    this.cartdata.emit(cartdata);
   }
  }

  // remove from cart
  removeitem(productid:number){
    let cartdata = localStorage.getItem('localcart');
    if(cartdata){
      let items:product[] =JSON.parse(cartdata);
      items = items.filter((item:product)=>productid!==item.id)
      localStorage.setItem('localcart',JSON.stringify(items));
      this.cartdata.emit(items);
    }
  }

  //user add to cart
  addtocart(cartdata:cart){
    return this.http.post("http://localhost:3000/cart", cartdata)
  }

  // get cart
  getcartlist(userid:number){
    return this.http.get<product[]>(`http://localhost:3000/cart?userid=`+userid,{observe:'response'})
    .subscribe((result)=>{
      if(result && result.body){
       // console.log("result is",result.body)
        this.cartdata.emit(result.body)
      }
    })
  }

  //remove to cart
  removetocart(cartid:number){
   return this.http.delete("http://localhost:3000/cart/"+cartid)
  }

  // currentcart cart page rendering
  currentcart(){
    let userstore = localStorage.getItem('user');
    let userdata  = userstore && JSON.parse(userstore); // string to object
    return this.http.get<cart[]>("http://localhost:3000/cart?userid="+userdata.id)
  }
  deleteCartItems(cartid: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartid).subscribe((result) => {
    //  this.cartdata.emit([]);
    })
  }
    
  ordernow(data:checkout){
   return this.http.post("http://localhost:3000/orders",data)
  }

 
  orderlist() {
     let userstore = localStorage.getItem('user');
    let userdata  = userstore && JSON.parse(userstore);
   /// console.log("user data is",userdata)
    return this.http.get<checkout[]>("http://localhost:3000/orders?userid="+userdata);
  }

  cancelorder(orderid:number){
    return this.http.delete("http://localhost:3000/orders/"+orderid);
  }

}
