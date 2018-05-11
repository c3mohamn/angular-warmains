import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { AppStateModule } from './modules/state/state.module';
import { RoutingModule } from './app.routing';
import { HeaderModule } from './components/header/header.module';
import { FooterModule } from './components/footer/footer.module';
import { ApiModule } from './modules/api/api.module';

import { LoggedInGuard } from './modules/auth/guards/logged-in.guard';
import { AuthService } from './modules/auth/services/auth.service';

import { AppComponent } from './components/app/app.component';
import { BodyComponent } from './components/body/body.component';

import { AppState, default as reducer } from './states/app.reducer';
import { AppStore, appStoreProviders } from './states/app.store';

@NgModule({
  declarations: [AppComponent, BodyComponent],
  imports: [
    BrowserModule,
    RoutingModule,
    ApiModule,
    BrowserAnimationsModule,
    HeaderModule,
    FooterModule,
    HttpClientModule
    // AppStateModule
  ],
  providers: [AuthService, appStoreProviders, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
