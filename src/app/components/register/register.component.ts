import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;

    constructor(formBuilder: FormBuilder) {
        this.registerForm = formBuilder.group({
            'first_name': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
            'last_name': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
            'email': [null, Validators.compose([Validators.required, Validators.email])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
        });
    }

    ngOnInit() {
    }

    onRegister() {
        console.log("on register")
    }

}
