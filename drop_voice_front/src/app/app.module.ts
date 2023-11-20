//components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MapComponent } from './components/map/map.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
//modules
import { NgModule, isDevMode } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './modules/material.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, MapComponent, NavBarComponent, LoginComponent, RegisterComponent],
  imports: [
    FormsModule,
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
