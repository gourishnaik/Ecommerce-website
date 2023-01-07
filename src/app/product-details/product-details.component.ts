import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productdata: undefined | product;
  productquantity: number = 1;
  quantityreached:string;
  constructor(private activeroute: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let productid = this.activeroute.snapshot.paramMap.get('productid');
    console.log("product id is", productid);
    productid && this.product.getproductbyid(productid).subscribe((res) => {
      this.productdata = res;
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
}
