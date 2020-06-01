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
import { UserService } from './data/services/user/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RegisterPsbComponent } from './components/register-psb/register-psb.component';
import { ContentComponent } from './components/content/content.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ContentComponent,
    RegisterPsbComponent
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
  providers: [PsbService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
