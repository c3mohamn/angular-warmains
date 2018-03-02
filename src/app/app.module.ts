import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './app.routing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';

import { ApiUserService } from './services/user/api-user.service';
import { AuthService } from './services/user/auth.service';
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
    HeaderModule,
    FooterModule,
    HttpClientModule
  ],
  providers: [
    ApiUserService,
    AuthService,
    ApiTalentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
