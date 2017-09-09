import {Component, OnInit} from '@angular/core';
import {Order} from "../../../models/order";
import {ApiService} from "../../../services/api.service";
import {Router} from "@angular/router";
import {SessionService} from "../../../services/session.service";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

    public orders: Order[];
    public canDelete: boolean;
    public canChangeStatus: boolean;

    constructor(private apiService: ApiService, private router: Router, private sessionService: SessionService) {
        let user = this.sessionService.getUser();
        this.canDelete = user.type === "admin";
        this.canChangeStatus = user.type === "manager";
    }

    ngOnInit() {
        this.loadOrders();
    }

    loadOrders() {
        this.apiService.adminGetOrders().then((orders) => this.orders = orders);
    }

    setNewStatus(order, new_status) {
        if (this.canChangeStatus && new_status) {
            this.apiService.adminUpdateStatusOrder(order._id, new_status).then(() => this.loadOrders());
        }
    }

    goDelete(order) {
        if (this.canDelete && confirm("Are you sure you want to delete this order?")) {
            this.apiService.adminDeleteOrder(order._id).then(() => this.loadOrders());
        }
    }

}
