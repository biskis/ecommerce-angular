import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user";
import {ApiService} from "../../../services/api.service";
import {Router} from "@angular/router";
import {SessionService} from "../../../services/session.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    public users: User[];

    constructor(private apiService: ApiService, private router: Router, private sessionService: SessionService) {
        let user = this.sessionService.getUser();
        if(user.type !== "admin" ){
            this.router.navigateByUrl("/admin/products");
        }
    }

    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        this.apiService.adminGetUsers().then((users) => this.users = users);
    }

    goAddNew() {
        this.router.navigateByUrl("/admin/user");
    }

    goEdit(user) {
        this.router.navigateByUrl("/admin/user/" + user._id);
    }

    goDelete(user) {
        if(confirm("Are you sure you want to delete this user?") ) {
            this.apiService.adminDeleteUser(user._id).then((users) => this.users = users);
        }
    }

}
