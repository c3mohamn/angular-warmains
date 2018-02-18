import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
// TODO: Add routing in body
// import { AppRoutingModule } from './app-routing.module';

import { HeaderModule } from './header/header.module';
import { BodyModule } from './body/body.module';
import { FooterModule } from './footer/footer.module';

import { ApiUserService } from './services/users/api-user.service';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HeaderModule,
    BodyModule,
    FooterModule
  ],
  providers: [ApiUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
