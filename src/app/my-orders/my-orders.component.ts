import { Component, OnInit } from '@angular/core';
import { checkout } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orderdata:checkout[]|undefined;
  constructor(private product:ProductService) { }

  ngOnInit(): void {
  this.getorderlist()
   }

   getorderlist(){
    this.product.orderlist().subscribe((result) => {
      this.orderdata = result;
      console.log(this.orderdata);
    })
   }

  //cancel order
  cancelorder(orderid:number|undefined){
   orderid && this.product.cancelorder(orderid).subscribe((result)=>{
    if(result){
     this.getorderlist()
    }
   })
 
   
  }




  }

 
  
  
  