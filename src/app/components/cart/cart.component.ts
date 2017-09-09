import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from '../../reducers';
import * as cart from '../../actions/cart';
import * as _ from "lodash";
import {SessionService} from "../../services/session.service";
import {ToasterService} from "angular2-toaster";
import {ApiService} from "../../services/api.service";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    public cartItems: any;
    private sub: any;
    public hasSession: boolean = false;
    public user = null;
    public showSuccess: boolean = false;

    constructor(private store: Store<fromRoot.State>, sessionService: SessionService, private apiService: ApiService, private toasterService: ToasterService) {
        this.sub = this.store.select(fromRoot.getCart)
            .subscribe((data) => this.cartItems = _.sortBy(data, ['data.title']));

        this.hasSession = !!sessionService.getSession();
        if(this.hasSession) {
            this.user = sessionService.getUser();
        }
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        if(this.sub) {
            this.sub.unsubscribe();
        }
    }

    getTotal() :number {
        let price = 0;
        this.cartItems.forEach((item) => {
            price += item.quantity * item.data.price;
        });
        return price;
    }


    onAdd(product) {
        this.store.dispatch(new cart.AddAction(product));
    }
    onRemove(product) {
        this.store.dispatch(new cart.RemoveAction(product));
    }

    openCheckout() {
        if(this.cartItems.length === 0) {
            this.toasterService.pop('error', 'There are no products in the cart');
            return ;
        }


        let that = this;
        let handler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_Ar8xk0bdaCSIdFfQp9xS9DEQ',
            locale: 'auto',
            token: function (token: any) {
                // You can access the token ID with `token.id`.
                // Get the token ID to your server-side code for use.
                console.log(token);
                that.apiService.createOrder({
                    cart: that.cartItems,
                    stripe_token: token.id
                }).then(function (data) {
                    that.showSuccess = true;
                    that.store.dispatch(new cart.ClearAction(null));
                });
            }
        });

        handler.open({
            name: 'E-commerce test',
            description: 'Payment for all products',
            email: this.user.email,
            amount: Math.round(this.getTotal() * 100),
        });

    }


}
