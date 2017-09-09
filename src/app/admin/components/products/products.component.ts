import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {Product} from "../../../models/product";
import {Router} from "@angular/router";
import {SessionService} from "../../../services/session.service";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    public products: Product[];
    public canDelete: boolean;

    constructor(private apiService: ApiService, private router: Router, private sessionService: SessionService) {
        let user = this.sessionService.getUser();
        this.canDelete = user.type === "admin";
    }

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts() {
        this.apiService.getProducts().then((products) => this.products = products);
    }

    goAddNew() {
        this.router.navigateByUrl("/admin/product");
    }

    goEdit(product) {
        this.router.navigateByUrl("/admin/product/" + product._id);
    }

    goDelete(product) {
        if(this.canDelete && confirm("Are you sure you want to delete this product?") ) {
            this.apiService.adminDeleteProduct(product._id).then(() => this.loadProducts());
        }
    }

}
