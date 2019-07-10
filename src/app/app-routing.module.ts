import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './auth/guards/logged-in.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    data: { title: 'Home' }
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
    data: { title: 'About' }
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then(m => m.LoginModule),
    data: { title: 'Login' },
    canActivate: [LoggedInGuard]
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/register/register.module').then(m => m.RegisterModule),
    data: { title: 'Register' },
    canActivate: [LoggedInGuard]
  },
  {
    path: 'talent/:classId',
    loadChildren: () =>
      import('./talent-calculator/talent-calculator.module').then(
        m => m.TalentCalculatorModule
      ),
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
