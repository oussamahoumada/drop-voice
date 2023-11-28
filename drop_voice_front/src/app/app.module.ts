//components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MapComponent } from './components/map/map.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { MarkerContentComponent } from './components/marker-content/marker-content.component';
import { MyCardComponent } from './components/my-card/my-card.component';
import { LecteurAudioComponent } from './components/lecteur-audio/lecteur-audio.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

//modules
import { NgModule, isDevMode } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './modules/material.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './modules/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgAudioRecorderModule } from 'ng-audio-recorder';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    NavBarComponent,
    MarkerContentComponent,
    MyCardComponent,
    LecteurAudioComponent,
    LoginComponent,
    RegisterComponent,
    StepperComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NgxAudioPlayerModule,
    CommonModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgAudioRecorderModule,
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
