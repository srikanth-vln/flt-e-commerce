import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  
  @Input() cartProducts: any
  @Input() totalItems: any
  @Input() totalPrice: any;
  
  @Output() saveCartItemsEvent = new EventEmitter();
  
  ngOnInit() {

  }
  
  saveCartItems() {
    this.saveCartItemsEvent.emit();
  }

}
