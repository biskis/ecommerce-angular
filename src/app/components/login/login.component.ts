import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {SessionService} from "../../services/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(formBuilder: FormBuilder, private apiService: ApiService, private sessionService: SessionService, private router: Router) {
        this.loginForm = formBuilder.group({
            'email': [null, Validators.compose([Validators.required, Validators.email])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
        });
    }

    ngOnInit() {
    }

    onLogin() {
        console.log("on login")
        this.apiService.login({
            'email': this.loginForm.controls['email'].value,
            'password': this.loginForm.controls['password'].value,
        }).then(data => {
            this.sessionService.setSession(data.auth_key, data.user);
            this.router.navigateByUrl("/");
        })
    }


}
