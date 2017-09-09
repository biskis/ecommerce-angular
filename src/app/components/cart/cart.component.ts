import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from '../../reducers';
import * as cart from '../../actions/cart';
import * as _ from "lodash";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    public cartItems: any;
    private sub: any;

    constructor(private store: Store<fromRoot.State>) {
        this.sub = this.store.select(fromRoot.getCart)
            .subscribe((data) => this.cartItems = _.sortBy(data, ['data.title']));

    }

    ngOnInit() {

    }

    ngOnDestroy() {
        if(this.sub) {
            this.sub.unsubscribe();
        }
    }

    onAdd(product) {
        this.store.dispatch(new cart.AddAction(product));
    }
    onRemove(product) {
        this.store.dispatch(new cart.RemoveAction(product));
    }

}
