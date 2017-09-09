import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {environment} from "../../environments/environment";
import {SessionService} from "./session.service";
import {Product} from "../models/product";
import {User} from "../models/user";
import {ToasterService} from "angular2-toaster";
import {Order} from "../models/order";


@Injectable()
export class ApiService {

    constructor(private http: Http, private sessionService: SessionService) {
    }

    private getBaseUrl(): string {
        if (environment.apiBaseUrl) {
            return environment.apiBaseUrl;
        }
    }

    private getHeaders(): Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let session = this.sessionService.getSession();
        if (session !== null) {
            headers.append('auth_key', session)
        }
        return headers
    }

    private sendPost(url: string, data): Promise<any> {
        return this.http.post(url, data, {headers: this.getHeaders()})
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    private sendGet(url: string): Promise<any> {
        return this.http.get(url, {headers: this.getHeaders()})
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    private sendDelete(url: string): Promise<any> {
        return this.http.delete(url, {headers: this.getHeaders()})
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        if (error._body) {
            let errorBody = JSON.parse(error._body);
            if (errorBody.error && errorBody.error.code === 10) {
                console.log("Missing session. Error code 10.", errorBody.error.code)
                localStorage.removeItem("ecommerce_auth_token");
                localStorage.removeItem("ecommerce_user");
                window.location.replace("/login");
            }
        }

        return Promise.reject(error.message || error);
    }





    getProducts() :Promise<Product[]> {
        return this.sendGet(this.getBaseUrl() + "products");
    }

    register(data) : Promise<any> {
        return this.sendPost(this.getBaseUrl() + "user/register", data);
    }
    login(data) : Promise<any> {
        return this.sendPost(this.getBaseUrl() + "user/login", data);
    }
    profileUpdate(data) : Promise<any> {
        return this.sendPost(this.getBaseUrl() + "user/update", data);
    }


    createOrder(data) : Promise<Order> {
        return this.sendPost(this.getBaseUrl() + "order/create", data);
    }
    getMineOrders() : Promise<Order[]> {
        return this.sendGet(this.getBaseUrl() + "order/mine");
    }





    ///ADMIN APIS
    adminGetProduct(product_id) : Promise<Product> {
        return this.sendGet(this.getBaseUrl() + "product/get/" + product_id);
    }
    adminAddProduct(product) : Promise<Product> {
        return this.sendPost(this.getBaseUrl() + "product/add", product);
    }
    adminUpdateProduct(product) : Promise<Product> {
        return this.sendPost(this.getBaseUrl() + "product/update/" + product._id, product);
    }
    adminDeleteProduct(product_id) : Promise<Product> {
        return this.sendDelete(this.getBaseUrl() + "product/delete/" + product_id);
    }

    adminGetOrders() : Promise<Order[]> {
        return this.sendGet(this.getBaseUrl() + "orders/all");
    }
    adminUpdateStatusOrder(order_id, new_status) : Promise<Product> {
        return this.sendPost(this.getBaseUrl() + "order/set_status/" + order_id, {status: new_status});
    }
    adminDeleteOrder(order_id) : Promise<Product> {
        return this.sendDelete(this.getBaseUrl() + "order/delete/" + order_id);
    }


}
