import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DetailsComponent } from './details/details.component';
import { PhoneuserComponent } from './phoneuser/phoneuser.component';
import { AuthGuard } from './_guards/auth.guard';
export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      {
        path: 'details',
        component: DetailsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'phoneuser',
        component: PhoneuserComponent,
        canActivate: [AuthGuard]
      }
    ]
  },

  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
