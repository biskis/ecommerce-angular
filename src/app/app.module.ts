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
import {
    MdButtonModule, MdCardModule, MdInputModule, MdListModule, MdTableModule,
    MdToolbarModule
} from "@angular/material";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {metaReducers, reducers} from "./reducers/index";
import { OrdernpmPipe } from './pipes/ordernpm.pipe';
import {ToasterModule} from "angular2-toaster";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        TopBarComponent,
        CartComponent,
        ProfileComponent,
        ProductInListComponent,
        OrdernpmPipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,

        StoreModule.forRoot(reducers, {metaReducers}),
        // EffectsModule.forRoot([])

        ToasterModule,
        MdButtonModule, MdToolbarModule, MdCardModule, MdListModule, MdTableModule, MdInputModule
    ],
    providers: [ApiService, SessionService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
