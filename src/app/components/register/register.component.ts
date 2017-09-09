import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {SessionService} from "../../services/session.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;

    constructor(formBuilder: FormBuilder, private apiService: ApiService, private sessionService: SessionService, private router: Router) {
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
        this.apiService.register({
            'first_name': this.registerForm.controls['first_name'].value,
            'last_name': this.registerForm.controls['last_name'].value,
            'email': this.registerForm.controls['email'].value,
            'password': this.registerForm.controls['password'].value,
        }).then(data => {
            this.sessionService.setSession(data.auth_key, data.user);
            this.router.navigateByUrl("/");
        })
    }

}
