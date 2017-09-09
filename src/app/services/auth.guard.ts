import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {SessionService} from "./session.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private sessionService: SessionService,
                private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(this.sessionService.getSession() !== null) {
            return true;
        } else {
            this.router.navigateByUrl('/login');  /*Go to login if we don't have a session and try to navigate somewhere where session is needed.*/
            return false;
        }
    }
}
