import * as cartModel from "../models/cart";
import * as cart from "../actions/cart";
import {merge, clone, without, find} from 'lodash';

export function reducer(state = cartModel.defaults, action: cart.Actions): cartModel.Cart {
    let stateCopy = clone(state);
    let item;
    let quantity;
    switch (action.type) {
        case cart.ActionTypes.ADD:
            item = find(state.cart, (product) => product.data && product.data._id === action.payload._id);
            stateCopy.cart = without(state.cart, item);
            quantity = item ? item.quantity + 1 : 1;
            stateCopy.cart.push({quantity: quantity, data: action.payload});
            return merge({}, stateCopy);
        case cart.ActionTypes.REMOVE:
            item = find(state.cart, (product) => product.data._id === action.payload._id);
            stateCopy.cart = without(state.cart, item);
            if(!item || item.quantity === 1) return merge({}, stateCopy);

            quantity = item.quantity - 1;
            stateCopy.cart.push({quantity: quantity, data: action.payload});
            return merge({}, stateCopy);
        case cart.ActionTypes.CLEAR:
            stateCopy.cart = [];
            return merge({}, stateCopy)
        default:
            return state;
    }
}

export const getCart = (state: cartModel.Cart) => state.cart;