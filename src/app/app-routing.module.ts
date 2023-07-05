import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './pages/posts/posts.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RouteguardService } from './services/routeguard.service';

const routes: Routes = [
  { path: 'posts/create', component: CreatePostComponent },
  { path: '', component: HomeComponent }, // Route for the home page
  { path: 'register', component: RegisterComponent }, // Route for the register page
  { path: 'login', component: LoginComponent }, // Route for the login page
  {
    path: 'profile',
    component: ProfileComponent,
    // canActivate: [RouteguardService],
  },
  {
    path: 'posts',
    component: PostsComponent,
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
