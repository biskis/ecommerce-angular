import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../../reducers';
import * as cart from '../../actions/cart';
import {Store} from "@ngrx/store";
import {SessionService} from "../../services/session.service";


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

    public cartItems: any;
    private sub: any;
    public hasSession: boolean;

    constructor(private store: Store<fromRoot.State>, private sessionService: SessionService) {
        this.sub = this.store.select(fromRoot.getCart).subscribe((data) => this.cartItems = data);
        this.hasSession = !!sessionService.getSession();
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        if(this.sub) {
            this.sub.unsubscribe();
        }
    }

}
