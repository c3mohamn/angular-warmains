import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppStateModule } from './state/state.module';
import { RoutingModule } from './app-routing.module';
import { FooterModule } from './core/footer/footer.module';

import { LoggedInGuard } from './auth/guards/logged-in.guard';

import { AppComponent } from './components/app/app.component';
import { BodyComponent } from './components/body/body.component';
import { HeaderModule } from './core/header/header.module';

@NgModule({
  declarations: [AppComponent, BodyComponent],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    HeaderModule,
    FooterModule,
    HttpClientModule,
    AppStateModule
  ],
  providers: [LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
