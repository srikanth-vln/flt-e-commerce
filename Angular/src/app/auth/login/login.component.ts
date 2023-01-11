import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userName: string = ""
  passWord: string = ""
  validUserName = "admin";
  validPassword = "admin";
  isLoggedIn: boolean = false;
  isError: boolean = false;
  validationMessage: string = "";
  
  constructor(private router: Router,private productservice:ProductService) { 
    
  }
  
  ngOnInit() { 

    if(sessionStorage.getItem('validationstatus')=='true'){

      this.router.navigate(['home'])
    }
    
  }
  
  validate() {
    //call node from here passing username and password 
    //get result from node as boolean with result code 200
    //use the resultan boolean to decid wether to navigate to home or show error msg
    this.productservice.validate(this.userName,this.passWord).subscribe(result=>{
      if (result){
        this.isLoggedIn = true;
        this.isError = false;
        this.router.navigate(['home'])
      }
         
    else {
      this.router.navigate(['login']) 
      this.isError = true;
      this.isLoggedIn = false;
      this.validationMessage = "Invalid Credentials!"

    }
    sessionStorage.setItem('validationstatus',result.toString())
    })

  }
 
}
