import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { LoginComponent } from './components/login/login.component';
import { AdminPsbComponent } from './components/admin-psb/admin-psb.component';
import { AuthGuard } from './core/guards/auth.guard';
import { MapComponent } from './components/map/map.component';


const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: '',
        component: MapComponent
      },
      {
        path: 'admin',
        canActivate: [AuthGuard],
        component: AdminPsbComponent
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
