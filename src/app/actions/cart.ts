import { Action } from '@ngrx/store';
import { type } from '../util';
import { Product} from "../models/product";

export const ActionTypes = {
    ADD: type('[Cart] Add Product'),
    REMOVE: type('[Cart] Remove Product'),
    CLEAR: type('[Cart] Clear cart'),
};
export class AddAction implements Action {
    readonly type = ActionTypes.ADD;

    constructor(public payload: Product) { }
}

export class RemoveAction implements Action {
    readonly type = ActionTypes.REMOVE;

    constructor(public payload: any) {}
}
export class ClearAction implements Action {
    readonly type = ActionTypes.CLEAR;

    constructor(public payload: any) {}
}

export type Actions
    = AddAction
    | RemoveAction
    | ClearAction
    ;
