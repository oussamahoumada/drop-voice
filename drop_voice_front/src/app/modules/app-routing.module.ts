import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  /*{ path: '**', redirectTo: 'home' },*/
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent/*, canActivate: [AuthGuard]*/ },
  { path: 'home', component: HomeComponent/*, canActivate: [AuthGuard]*/ },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
