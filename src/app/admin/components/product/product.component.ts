import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    productForm: FormGroup;
    isNew: boolean;
    sub: any;
    productId: string;

    constructor(formBuilder: FormBuilder, private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
        this.productForm = formBuilder.group({
            'title': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
            'description': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            'price': [null, Validators.compose([Validators.required, Validators.min(0.01)])],
            'quantity': [null, Validators.compose([Validators.required])],
        });

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.isNew = false;
                this.productId = params['id'];
                this.loadProduct();
            } else {
                this.isNew = true;
            }
        })
    }

    loadProduct() {
        this.apiService.adminGetProduct(this.productId).then((product) => {
            this.productForm.controls['title'].setValue(product.title);
            this.productForm.controls['description'].setValue(product.description);
            this.productForm.controls['price'].setValue(product.price);
            this.productForm.controls['quantity'].setValue(product.quantity);
        });
    }

    ngOnDestroy() {
        if(this.sub) {
            this.sub.unsubscribe();
        }
    }

    onSubmit() {
        if(this.productForm.valid) {
            let data = {
                'title': this.productForm.controls['title'].value,
                'description': this.productForm.controls['description'].value,
                'price': this.productForm.controls['price'].value,
                'quantity': this.productForm.controls['quantity'].value,
            };

            if (this.isNew) {
                this.apiService.adminAddProduct(data).then(data => {
                    this.router.navigateByUrl("/admin/products");
                })
            } else {
                data['_id'] = this.productId;
                this.apiService.adminUpdateProduct(data).then(data => {
                    this.router.navigateByUrl("/admin/products");
                })
            }
        }
    }


}
