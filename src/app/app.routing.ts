import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { LoggedInGuard } from './body/logged-in.guard';

const routes: Routes = [
  { path: 'home', loadChildren: './body/home/home.module#HomeModule' },
  { path: 'about', loadChildren: './body/about/about.module#AboutModule' },
  { path: 'login', loadChildren: './body/login/login.module#LoginModule', canActivate: [ LoggedInGuard ] },
  { path: 'register', loadChildren: './body/register/register.module#RegisterModule', canActivate: [ LoggedInGuard ] },
  { path: 'talent/:classId', loadChildren: './body/talent-calculator/talent-calculator.module#TalentCalculatorModule' },
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
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
