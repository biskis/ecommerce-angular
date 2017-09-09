import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getProducts().then(products => this.products = products);
  }

}
