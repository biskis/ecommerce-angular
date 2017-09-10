import {Injectable} from '@angular/core';
import {User} from "../models/user";

@Injectable()
export class SessionService {


    constructor() {
    }

    setSession(auth_key: string, user: any) {
        localStorage.setItem("auth_key", auth_key);
        if(user) {
            this.setUser(user);
        }
    }

    getSession() {
        if(localStorage.getItem("auth_key")) {
            return localStorage.getItem("auth_key");
        }
        return null;
    }

    setUser(user) {
        localStorage.setItem("ecommerce_user", JSON.stringify(user));
    }

    getUser() {
        if(localStorage.getItem("ecommerce_user")) {
            return JSON.parse(localStorage.getItem("ecommerce_user"));
        }
        return null;
    }
    isAdmin() {
        let user = this.getUser();
        return user && user.type === "admin";
    }
    isManager() {
        let user = this.getUser();
        return user && user.type === "manager";
    }


    removeSession() {
        localStorage.removeItem("auth_key");
        localStorage.removeItem("ecommerce_user");
    }
}
