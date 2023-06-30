import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreatePostComponent } from './pages/create-post/create-post.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

import { RouteguardService } from './services/routeguard.service';

import {ProfileComponent} from "./pages/profile/profile.component";

const routes: Routes = [
  { path: 'posts/create', component: CreatePostComponent },
  // {path: '', component: },
  // {path: 'register', component: },
  // {path: 'login', component: },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [RouteguardService],
  },
  { path: '**', component: NotfoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
