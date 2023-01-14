import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menutype:string='default';
  sellername:string='';
  username:string='';
  searchresult:undefined|product[];
  cartitems=0;
  constructor(private router:Router,private product:ProductService) { }

  ngOnInit(): void {
    this.router.events.subscribe((val:any)=>{

  if(val.url){
    console.log("url value is",val.url);
  
    if(localStorage.getItem('seller') && val.url.includes('seller')){
     //bring seller or login person name on login
      let sellerstore = localStorage.getItem('seller'); //local storage data will always be in string format
      let selldata    = sellerstore && JSON.parse(sellerstore)[0];   //to array
      this.sellername = selldata.name    // assign username to sellername property
     
      //seller login
     // console.log('this is seller area')
      this.menutype = "seller";

    }else if(localStorage.getItem('user')){
      let userstore = localStorage.getItem('user');
      let userdata  = userstore && JSON.parse(userstore);
      this.username = userdata.name;
      this.menutype ="user";
      this.product.getcartlist(userdata.id)
    }

    
    else{
     // console.log('outside to seller area')
      this.menutype = "default";
    }
  }
    });
    // if we have any item in local cart then it should be displayed in cart
      
     let cartdata = localStorage.getItem('localcart');
       if(cartdata){
        this.cartitems = JSON.parse(cartdata).length;
       }
      this.product.cartdata.subscribe((items)=>{
       this.cartitems = items.length;
     //  console.log(this.cartitems)
     })
  }

logout(){
  localStorage.removeItem('seller');
  this.router.navigate(['/'])

}
userlogout(){
  localStorage.removeItem('user');
  this.router.navigate(['/user-auth']);
  this.product.cartdata.emit([])
}

searchproduct(query:KeyboardEvent){
if(query){
  const element =query.target as HTMLInputElement;
//  console.log(element.value);
  this.product.searchproduct(element.value).subscribe((result)=>{
 // console.log(result);
 if(result.length>5){   // to show only 5 results in search
  result.length = length;
 }
 this.searchresult = result;
  })
}
}

// blue event used on outside click search dropdown must close
hideSearch(){
  this.searchresult=undefined
}

submitsearch(val:string){
console.log(val);
this.router.navigate([`search/${val}`])
}
redirecttodetails(id:number){
  this.router.navigate(['/details/'+id])
}
}
