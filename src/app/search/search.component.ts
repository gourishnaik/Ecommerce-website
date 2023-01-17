import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchresults:undefined|product[];
  constructor(private activeroute:ActivatedRoute,private product:ProductService) {
    let query =this.activeroute.snapshot.paramMap.get('query');
   // console.log(query);
  query && this.product.searchproduct(query).subscribe((res)=>{
    this.searchresults = res;
   })
   }

  ngOnInit(): void {
  }

}
