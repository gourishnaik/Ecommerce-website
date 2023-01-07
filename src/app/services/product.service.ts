import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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


}
