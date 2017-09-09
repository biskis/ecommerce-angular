import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {SessionService} from "../services/session.service";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private sessionService: SessionService,
                private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.sessionService.getSession() !== null) {
            let user = this.sessionService.getUser();
            if(user.type === "admin" || user.type === "manager") {
                return true;
            }
        }

        this.router.navigateByUrl('/');
        return false;
    }
}
