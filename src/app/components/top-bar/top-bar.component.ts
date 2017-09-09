import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../../reducers';
import * as cart from '../../actions/cart';
import {Store} from "@ngrx/store";


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

    public cartItems: any;
    private sub: any;

    constructor(private store: Store<fromRoot.State>) {
        this.sub = this.store.select(fromRoot.getCart).subscribe((data) => this.cartItems = data);

    }

    ngOnInit() {

    }

    ngOnDestroy() {
        if(this.sub) {
            this.sub.unsubscribe();
        }
    }

}
