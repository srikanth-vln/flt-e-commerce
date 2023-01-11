import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {} from '@angular/core'
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = []
  cartProducts: any[] = []
  
  isHomeView: boolean = false;
  isCartView: boolean = false;
  isLoggedout: boolean = false;
  totalItems: number = 0;
  totalPrice: number = 0;
  
  constructor(private productService : ProductService, private router : Router) {
   
    
  }
  
  //LifeCycle Hook
  ngOnInit(): void {
    if (sessionStorage.getItem('validationstatus') == 'true') {
      this.productService.getAllProducts().subscribe((result: any) => {
        this.products = result
        this.productService.getCartItems().subscribe((result: any)=> {
          this.cartProducts = result;
          this.totalItems = this.cartProducts.length;
          this.totalPrice = 0;
          this.products.forEach(item=> {
            if(this.cartProducts.filter(jtem=> jtem.id == item.id).length==1) {
              item.isCart = true;
              this.totalPrice = this.totalPrice + item.amount
            }
          })
        })
      })
      this.isHomeView = true;
    }
  
    else {
      this.router.navigate(['login'])
    }
  }
 

  ngOnDestroy() {
      sessionStorage.clear()
  }

  addProductInCart(product: any) {
    this.cartProducts.push(product);
    console.log(this.cartProducts);
    this.totalItems++;
    this.totalPrice = this.totalPrice + product.amount;
    product.isCart = true;
  }

  deleteProductInCart(product: any) {
    let pindex = this.cartProducts.findIndex(item=> item.id==product.id);
    this.cartProducts.splice(pindex,1);
    console.log(this.cartProducts);

    this.totalItems--;
    this.totalPrice = this.totalPrice - product.amount;
    product.isCart = false;
  }
  
  logOut() {
    sessionStorage.clear()
    this.router.navigate(['login'])
  }

  saveCartItems() {
    this.productService.saveCartItems(this.cartProducts).subscribe(result=> {
      alert('Save Call Done');
    })
  }
 
}
