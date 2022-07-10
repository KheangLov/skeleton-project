import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { AuthInterceptor } from './middlewares/interceptors/auth.interceptor';
import { AdminV4Component } from './layouts/admin-v4/admin-v4.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { GoogleAuthApiModule } from './modules/google-auth-api.module';
import { PwaModule } from './modules/pwa.module';

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
    AdminV4Component,
    NotFoundComponent,
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
    GoogleAuthApiModule,
    PwaModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
