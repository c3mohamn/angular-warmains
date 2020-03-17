import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoggedInGuard } from './guards/logged-in.guard';

import { AppComponent } from './app.component';

import { CoreModule } from './modules/core/core.module';
import { AppStateModule } from './modules/state/state.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, CoreModule, HttpClientModule, AppStateModule],
  providers: [LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
