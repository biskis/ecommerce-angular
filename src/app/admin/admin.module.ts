import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsComponent} from './components/products/products.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {MdButtonModule, MdInputModule, MdSelectModule} from "@angular/material";
import {ProductComponent} from './components/product/product.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToasterModule} from "angular2-toaster";
import {OrdersComponent} from './components/orders/orders.component';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,

        FormsModule,
        ReactiveFormsModule,

        MdButtonModule, MdInputModule, MdSelectModule,

        ToasterModule
    ],
    declarations: [ProductsComponent, ProductComponent, OrdersComponent]
})
export class AdminModule {
}
