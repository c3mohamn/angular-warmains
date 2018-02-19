import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RoutingModule } from './app.routing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material.module';

import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';

import { ApiUserService } from './services/user/api-user.service';
import { ApiTalentService } from './services/talent/api-talent.service';

import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HeaderModule,
    FooterModule
  ],
  providers: [
    ApiUserService,
    ApiTalentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
