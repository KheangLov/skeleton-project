import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  GoogleApiModule, 
  NgGapiClientConfig, 
  NG_GAPI_CONFIG,
} from 'ng-gapi';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentModule } from './modules/component.module';
import { LayoutModule } from './modules/layout.module';
import { MaterialModule } from './modules/material.module';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserComponent } from './pages/admin/user/user.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { DashboardV2Component } from './pages/admin/dashboard-v2/dashboard-v2.component';
import { UserV2Component } from './pages/admin/user-v2/user-v2.component';
import { UserV3Component } from './pages/admin/user-v3/user-v3.component';
import { DashboardV3Component } from './pages/admin/dashboard-v3/dashboard-v3.component';
import { AuthService } from './services/auth.service';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from './interceptors/auth.interceptor';

let gapiClientConfig: NgGapiClientConfig = {
  client_id: environment.googleClientId,
  discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UserComponent,
    DashboardV2Component,
    UserV2Component,
    UserV3Component,
    DashboardV3Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ComponentModule,
    LayoutModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
