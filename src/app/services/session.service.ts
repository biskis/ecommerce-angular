import {Injectable} from '@angular/core';
import {User} from "../models/user";

@Injectable()
export class SessionService {


    constructor() {
    }

    setSession(auth_key: string, user: any) {
        localStorage.setItem("auth_key", auth_key);
        localStorage.setItem("ecommerce_user", JSON.stringify(user));
    }

    getSession() {
        if(localStorage.getItem("auth_key")) {
            return localStorage.getItem("auth_key");
        }
        return null;
    }

    getUser() {
        if(localStorage.getItem("ecommerce_user")) {
            return localStorage.getItem("ecommerce_user");
        }
        return null;
    }

    removeSession() {
        localStorage.removeItem("auth_key");
        localStorage.removeItem("ecommerce_user");
    }
}
