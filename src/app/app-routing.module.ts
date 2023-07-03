import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Route for the login page
  { path: 'home', component: HomeComponent }, // Route for the home page
  { path: 'posts/create', component: CreatePostComponent }, // Route for creating a post page
  { path: 'register', component: RegisterComponent }, // Route for the register page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
