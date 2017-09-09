import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {ApiService} from "../../services/api.service";
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as cart from '../../actions/cart';
import {ToasterService} from "angular2-toaster";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    products: Product[];

    constructor(private apiService: ApiService, private toasterService: ToasterService, private store: Store<fromRoot.State>) {
    }

    ngOnInit() {
        this.apiService.getProducts().then(products => this.products = products);
    }

    addToCart(product: Product) {
        console.log("Add product to cart", product);
        this.store.dispatch(new cart.AddAction(product));
        this.toasterService.pop('success', 'Product Added to cart');
    }

}
