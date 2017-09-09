import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {SessionService} from "../../services/session.service";
import {Router} from "@angular/router";
import {ToasterService} from "angular2-toaster";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    userForm: FormGroup;

    constructor(formBuilder: FormBuilder, private apiService: ApiService, private sessionService: SessionService, private toasterService: ToasterService) {
        this.userForm = formBuilder.group({
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

        let user = this.sessionService.getUser();
        if(user) {
            console.log(user);
            if(user.first_name)  this.userForm.controls['first_name'].setValue(user.first_name);
            if(user.last_name)   this.userForm.controls['last_name'].setValue(user.last_name);
            if(user.address_street)  this.userForm.controls['address_street'].setValue(user.address_street);
            if(user.address_city)    this.userForm.controls['address_city'].setValue(user.address_city);
            if(user.address_state)   this.userForm.controls['address_state'].setValue(user.address_state);
            if(user.address_postcode)    this.userForm.controls['address_postcode'].setValue(user.address_postcode);
            if(user.billing_address_street)    this.userForm.controls['billing_address_street'].setValue(user.billing_address_street);
            if(user.billing_address_city)    this.userForm.controls['billing_address_city'].setValue(user.billing_address_city);
            if(user.billing_address_state)    this.userForm.controls['billing_address_state'].setValue(user.billing_address_state);
            if(user.billing_address_postcode)    this.userForm.controls['billing_address_postcode'].setValue(user.billing_address_postcode);
        }
    }

    ngOnInit() {
    }

    onUpdateProfile() {
        console.log("on register")
        this.apiService.profileUpdate({
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
        }).then(data => {
            this.sessionService.setUser(data);
            this.toasterService.pop('success', 'Profile updated');
        })
    }


}
