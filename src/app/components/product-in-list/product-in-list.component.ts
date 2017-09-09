import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/product";

@Component({
  selector: 'app-product-in-list',
  templateUrl: './product-in-list.component.html',
  styleUrls: ['./product-in-list.component.css']
})
export class ProductInListComponent implements OnInit {

  @Input() product: Product;

  constructor() { }

  ngOnInit() {
  }

}
