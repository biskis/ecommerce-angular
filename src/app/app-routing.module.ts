import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {CartComponent} from "./components/cart/cart.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {OrdersComponent} from "./components/orders/orders.component";
import {AuthGuard} from "./guards/auth.guard";
import {AdminGuard} from "./guards/admin.guard";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'cart', component: CartComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},

    {
        path: 'admin',
        loadChildren: 'app/admin/admin.module#AdminModule',
        canActivate: [AdminGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    providers: [AuthGuard, AdminGuard],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
