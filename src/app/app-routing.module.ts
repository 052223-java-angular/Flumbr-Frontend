import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RouteguardService } from './services/routeguard.service';

const routes: Routes = [
  // {path: '', component: },
  // {path: 'register', component: },
  // {path: 'login', component: },
   {path: 'profile', component: ProfileComponent, canActivate: [RouteguardService]},
   {path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
