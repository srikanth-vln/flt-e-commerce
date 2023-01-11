import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  baseURL: string = 'http://localhost:5000/'
  
validate(username:any,password:any){
  
  let currentURL: string = this.baseURL + 'validate/'+ username +'/'+password;
  return this.http.get(currentURL)
}

  getAllProducts() {
    let currentURL: string = this.baseURL + 'getAllProducts';
    return this.http.get(currentURL)
  }

  getProduct(productID: number) {
    let currentURL = this.baseURL + 'getProduct/' + productID;
    return this.http.get(currentURL);
  }

  saveCartItems(cartItems: any) {
    let currentURL = this.baseURL + 'saveCartItems/admin';
    return this.http.post(currentURL,cartItems)
  }

  getCartItems() {
    let currentURL = this.baseURL + 'getCartItems/admin';
    return this.http.get(currentURL);
  }

}
