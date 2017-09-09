import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../../reducers';
import * as cart from '../../actions/cart';
import {Store} from "@ngrx/store";
import {SessionService} from "../../services/session.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

    public cartItems: any;
    private sub: any;

    constructor(private store: Store<fromRoot.State>, public sessionService: SessionService, private router: Router) {
        this.sub = this.store.select(fromRoot.getCart).subscribe((data) => this.cartItems = data);
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        if(this.sub) {
            this.sub.unsubscribe();
        }
    }

    logout() {
        this.sessionService.removeSession();
        this.router.navigateByUrl("/login");
    }

}
