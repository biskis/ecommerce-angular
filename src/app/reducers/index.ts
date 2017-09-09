import {createSelector} from "reselect";


import * as cartModel from "../models/cart";
import * as fromCart from "./cart";
import {ActionReducer, ActionReducerMap, MetaReducer} from "@ngrx/store";
import {storeLogger} from "ngrx-store-logger";
import {localStorageSync} from "ngrx-store-localstorage";
import {environment} from "../../environments/environment";

export interface State {
    cart: cartModel.Cart;
}

export const reducers: ActionReducerMap<State> = {
    cart: fromCart.reducer
}

export function logger(reducer: ActionReducer<State>) : any {
    return storeLogger()(reducer);
}

export function localStorageSyncReducer(reducer: ActionReducer<any>) :ActionReducer<any> {
    return localStorageSync({keys: ['cart'], rehydrate: true})(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production
    ? [logger, localStorageSyncReducer]
    : [localStorageSyncReducer];


/* Cart */
export const getCartState = (state: State) => state.cart;
export const getCart = createSelector(getCartState, fromCart.getCart);
