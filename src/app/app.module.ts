import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MapComponent } from './components/map/map.component';
import { PsbService } from './data/services/psb/psb.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RegisterPsbComponent } from './components/register-psb/register-psb.component';
import { ContentComponent } from './components/content/content.component';
import { LoginComponent } from './components/login/login.component';
import { AdminPsbComponent } from './components/admin-psb/admin-psb.component';
import { AuthService } from '@data/services/auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ContentComponent,
    RegisterPsbComponent,
    LoginComponent,
    AdminPsbComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [PsbService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
