import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { LoggedInGuard } from './modules/auth/guards/logged-in.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: './components/body/pages/home/home.module#HomeModule',
    data: { title: 'Home' }
  },
  {
    path: 'about',
    loadChildren: './components/body/pages/about/about.module#AboutModule',
    data: { title: 'About' }
  },
  {
    path: 'login',
    loadChildren: './modules/auth/login/login.module#LoginModule',
    data: { title: 'Login' },
    canActivate: [LoggedInGuard]
  },
  {
    path: 'register',
    loadChildren: './modules/auth/register/register.module#RegisterModule',
    data: { title: 'Register' },
    canActivate: [LoggedInGuard]
  },
  {
    path: 'talent/:classId',
    loadChildren:
      './components/body/pages/talent-calculator/talent-calculator.module#TalentCalculatorModule',
    data: { title: 'Talents' }
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule {}
