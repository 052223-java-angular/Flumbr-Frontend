import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

const routes: Routes = [
  {path: "profile", component: ProfileComponent}
];

const routes: Routes = [
  // {path: '', component: },
  // {path: 'register', component: },
  // {path: 'login', component: },
   {path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
