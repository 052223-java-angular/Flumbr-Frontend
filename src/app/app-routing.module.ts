import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

import { RouteguardService } from './services/routeguard.service';

import { ProfileComponent } from './pages/profile/profile.component';
import { ViewPostsComponent } from './pages/view-posts/view-posts.component';
import { ResetPasswordComponent } from './pages/verify-account/reset-password/reset-password.component';
import { NewPasswordComponent } from './pages/verify-account/new-password/new-password.component';
import { SettingsComponent } from './pages/profile/settings/settings.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';

import { SearchPageComponent } from './pages/search-page/search-page.component';
import { AdminReportComponent } from './pages/admin-report/admin-report.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Route for the home page
  { path: 'register', component: RegisterComponent }, // Route for the register page
  { path: 'login', component: LoginComponent }, // Route for the login page
  { path: 'resetpassword', component: ResetPasswordComponent }, // Route for the reset password page
  { path: 'newpassword', component: NewPasswordComponent }, // Route for the setting new password password page

  {
    // handle user settings and route IF logged in user matches profileId
    path: 'profile/settings',
    component: SettingsComponent,
    canActivate: [RouteguardService],
  },

  { path: 'reports', component: AdminReportComponent, canActivate: [RouteguardService], },

  {
    // route to profile using userId, queries that user
    path: 'profile/:userId',
    component: ProfileComponent,
    canActivate: [RouteguardService],
  },

  { path: 'search', component: SearchPageComponent },

  {
    path: 'posts',
    component: ViewPostsComponent,
    canActivate: [RouteguardService],
  },
  {
    path: "posts/:id",
    component: PostDetailComponent
  },
  { path: '**', component: NotfoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
