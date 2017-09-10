import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductsComponent} from "./components/products/products.component";
import {ProductComponent} from "./components/product/product.component";
import {OrdersComponent} from "./components/orders/orders.component";
import {UsersComponent} from "./components/users/users.component";
import {UserComponent} from "./components/user/user.component";

const routes: Routes = [
    {path: 'products', component: ProductsComponent},
    {path: 'product', component: ProductComponent},
    {path: 'product/:id', component: ProductComponent},

    {path: 'orders', component: OrdersComponent},

    {path: 'users', component: UsersComponent},
    {path: 'user', component: UserComponent},
    {path: 'user/:id', component: UserComponent},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
