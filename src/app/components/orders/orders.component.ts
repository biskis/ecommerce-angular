import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Order} from "../../models/order";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public orders: Order[];


  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.apiService.getMineOrders().then((orders) => this.orders = orders)
  }

}
