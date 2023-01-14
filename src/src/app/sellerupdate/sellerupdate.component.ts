import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-sellerupdate',
  templateUrl: './sellerupdate.component.html',
  styleUrls: ['./sellerupdate.component.css']
})
export class SellerupdateComponent implements OnInit {
  productdata: undefined | product;
  constructor(private route: ActivatedRoute, private product: ProductService,private router:Router) { }

  ngOnInit(): void {
    let productid = this.route.snapshot.paramMap.get('id')  //in route id was given so we use id
    // console.log("product id is",productid)
    productid && this.product.getproductbyid(productid).subscribe((data => {
      //console.log(data)
      this.productdata = data;
    }))
  }
  submit(data: any) {
    // assign product id to data id
    if (this.productdata) {
      data.id = this.productdata.id;
    }
    this.product.updateproduct(data).subscribe((result) => {
      if (result) {
        alert("updated successfuly")
        this.router.navigate(['sellerhome'])
      }
    })

  }
}
