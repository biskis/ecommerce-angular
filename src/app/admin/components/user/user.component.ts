import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    userForm: FormGroup;
    isNew: boolean;
    sub: any;
    userId: string;

    constructor(private formBuilder: FormBuilder, private apiService: ApiService, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.isNew = false;
                this.userId = params['id'];
                this.loadUser();
                this.userForm = this.formBuilder.group({
                    'email': [null, Validators.compose([Validators.required, Validators.email])],
                    'type': [null, Validators.compose([Validators.required])],
                    'first_name': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
                    'last_name': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
                    'address_street': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
                    'address_city': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
                    'address_state': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
                    'address_postcode': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
                    'billing_address_street': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
                    'billing_address_city': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
                    'billing_address_state': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
                    'billing_address_postcode': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
                });
            } else {
                this.isNew = true;
                this.userForm = this.formBuilder.group({
                    'email': [null, Validators.compose([Validators.required, Validators.email])],
                    'type': [null, Validators.compose([Validators.required])],
                    'password': [null, Validators.compose([Validators.required])],
                    'first_name': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
                    'last_name': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
                    'address_street': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
                    'address_city': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
                    'address_state': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
                    'address_postcode': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
                    'billing_address_street': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
                    'billing_address_city': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
                    'billing_address_state': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
                    'billing_address_postcode': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
                });
            }
        })
    }

    loadUser() {
        this.apiService.adminGetUser(this.userId).then((user) => {
            this.userForm.controls['email'].setValue(user.email);
            this.userForm.controls['type'].setValue(user.type);
            this.userForm.controls['first_name'].setValue(user.first_name);
            this.userForm.controls['last_name'].setValue(user.last_name);
            this.userForm.controls['address_street'].setValue(user.address_street);
            this.userForm.controls['address_city'].setValue(user.address_city);
            this.userForm.controls['address_state'].setValue(user.address_state);
            this.userForm.controls['address_postcode'].setValue(user.address_postcode);
            this.userForm.controls['billing_address_street'].setValue(user.billing_address_street);
            this.userForm.controls['billing_address_city'].setValue(user.billing_address_city);
            this.userForm.controls['billing_address_state'].setValue(user.billing_address_state);
            this.userForm.controls['billing_address_postcode'].setValue(user.billing_address_postcode);
        });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    onSubmit() {
        if (this.userForm.valid) {
            let data = {
                'email': this.userForm.controls['email'].value,
                'type': this.userForm.controls['type'].value,
                'first_name': this.userForm.controls['first_name'].value,
                'last_name': this.userForm.controls['last_name'].value,
                'address_street': this.userForm.controls['address_street'].value,
                'address_city': this.userForm.controls['address_city'].value,
                'address_state': this.userForm.controls['address_state'].value,
                'address_postcode': this.userForm.controls['address_postcode'].value,
                'billing_address_street': this.userForm.controls['billing_address_street'].value,
                'billing_address_city': this.userForm.controls['billing_address_city'].value,
                'billing_address_state': this.userForm.controls['billing_address_state'].value,
                'billing_address_postcode': this.userForm.controls['billing_address_postcode'].value,
            };

            if (this.isNew) {
                data['password'] = this.userForm.controls['password'].value,
                    this.apiService.adminAddUser(data).then(data => {
                        this.router.navigateByUrl("/admin/users");
                    })
            } else {
                data['_id'] = this.userId;
                this.apiService.adminUpdateUser(data).then(data => {
                    this.router.navigateByUrl("/admin/users");
                })
            }
        }
    }

}
