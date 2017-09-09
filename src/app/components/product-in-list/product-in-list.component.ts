import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../models/product";

@Component({
  selector: 'app-product-in-list',
  templateUrl: './product-in-list.component.html',
  styleUrls: ['./product-in-list.component.css']
})
export class ProductInListComponent implements OnInit {

  @Input() product: Product;
  @Output() onAddToCart = new EventEmitter<Product>();

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    this.onAddToCart.emit(this.product);
  }

}
