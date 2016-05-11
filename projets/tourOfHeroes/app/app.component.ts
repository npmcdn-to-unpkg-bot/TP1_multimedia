import {Component}       from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from 'angular2/router';

import {HeroService}     from './hero.service';
import {HeroesComponent} from './heroes.component';
import {DashboardComponent} from './dashboard.component';
import { HeroDetailComponent } from './hero-detail.component';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    HeroService
  ]
})

@RouteConfig([
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/detail/:id',
    name: 'HeroDetail',
    component: HeroDetailComponent
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesComponent
  }
])

export class AppComponent {
  title = 'Tour of Heroes';

  constructor(private _router:Router,
              private _heroService:HeroService) {
  }

  newHero() {
    this._heroService.save();
    var idNH = this._heroService.newHero();
    this._router.navigate(['HeroDetail', {id: idNH }]);

  }
}
