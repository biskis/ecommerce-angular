import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {TopBarComponent} from './components/top-bar/top-bar.component';
import {CartComponent} from './components/cart/cart.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProductInListComponent} from './components/product-in-list/product-in-list.component';
import {ApiService} from "./services/api.service";
import {HttpModule} from "@angular/http";
import {SessionService} from "./services/session.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MdButtonModule, MdCardModule, MdToolbarModule} from "@angular/material";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        TopBarComponent,
        CartComponent,
        ProfileComponent,
        ProductInListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        BrowserAnimationsModule,


        MdButtonModule, MdToolbarModule, MdCardModule
    ],
    providers: [ApiService, SessionService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
