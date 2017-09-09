import { Action } from '@ngrx/store';
import { type } from '../util';
import { Product} from "../models/product";

export const ActionTypes = {
    ADD: type('[Cart] Add Product'),
    REMOVE: type('[Cart] Remove Product')
};
export class AddAction implements Action {
    readonly type = ActionTypes.ADD;

    constructor(public payload: Product) { }
}

export class RemoveAction implements Action {
    readonly type = ActionTypes.REMOVE;

    constructor(public payload: any) {}
}

export type Actions
    = AddAction
    | RemoveAction
    ;
