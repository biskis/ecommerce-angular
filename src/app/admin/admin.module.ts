import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsComponent} from './components/products/products.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {MdButtonModule, MdInputModule} from "@angular/material";
import { ProductComponent } from './components/product/product.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToasterModule} from "angular2-toaster";

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,

        FormsModule,
        ReactiveFormsModule,

        MdButtonModule, MdInputModule,

        ToasterModule
    ],
    declarations: [ProductsComponent, ProductComponent]
})
export class AdminModule {
}
