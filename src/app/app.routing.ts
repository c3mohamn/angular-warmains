import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { LoggedInGuard } from './body/logged-in.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', loadChildren: './body/home/home.module#HomeModule' },
  { path: 'about', loadChildren: './body/about/about.module#AboutModule' },
  { path: 'login', loadChildren: './body/login/login.module#LoginModule', canActivate: [ LoggedInGuard ] },
  { path: 'register', loadChildren: './body/register/register.module#RegisterModule', canActivate: [ LoggedInGuard ] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class RoutingModule { }
