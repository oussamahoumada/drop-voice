import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Routes, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.authService.isLogged();
    const routes: (string | undefined)[] = this.routesAllowed();

    const routeHome: UrlTree = this.router.parseUrl('/home')
    if (isAuthenticated) {
      this.authService.setLogged(true)

      if (!routes.includes(state.url)) {
        return routeHome
      }
      return true;
    } else {
      return this.router.parseUrl('/');
    }
  }

  private routesAllowedFiltered(): Route[]
  {
    return this.router.config.filter(route => route.canActivate)
  }

  private routesAllowed(): (string | undefined)[]
  {
    const routes: Route[] = this.routesAllowedFiltered()

    return routes.map(route => '/' + route.path)
  }

}
