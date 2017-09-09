import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductsComponent} from "./components/products/products.component";
import {ProductComponent} from "./components/product/product.component";
import {OrdersComponent} from "./components/orders/orders.component";

const routes: Routes = [
    {path: 'products', component: ProductsComponent},
    {path: 'product', component: ProductComponent},
    {path: 'product/:id', component: ProductComponent},


    {path: 'orders', component: OrdersComponent},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
