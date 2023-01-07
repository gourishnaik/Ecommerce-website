import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productlist:undefined | product[]; //data type product[]
  productmessage:undefined|string;
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.myproductlist();
  }

  myproductlist(){
    this.product.productlist().subscribe((result)=>{
      this.productlist  = result;
 })
  }
  deleteuser(id:number){
  //console.log(id)
  this.product.deleteproduct(id).subscribe((result)=>{ 

    if(result){
      this.productmessage = "Product is added successfully"  
     }
     setTimeout(()=>{
       this.productmessage = undefined;
     },3000)

  })
  this.myproductlist();
  }
}


