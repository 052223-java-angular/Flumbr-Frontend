import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { PostsContainerComponent } from './components/posts/posts-container/posts-container.component';
import { PostComponent } from './components/posts/post/post.component';
import { LoginComponent } from './pages/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { NgEventBus } from 'ng-event-bus';
import { ProfileComponent } from './pages/profile/profile.component';

//import { NotificationComponent } from './components/notification/notification.component';
import { NotificationTypeComponent } from './components/notification-panel/notification-type/notification-type.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { RouteguardService } from './services/routeguard.service';
import { AuthService } from './services/auth.service';
import { NotificationPanelComponent } from './components/notification-panel/notification-panel.component';
import { NotificationMessageComponent } from './components/notification-panel/notification-message/notification-message.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { FollowComponent } from './components/follow/follow.component';
import { ProfileSelectorComponent } from './components/profile-selector/profile-selector.component';
import { MatSelectModule } from '@angular/material/select';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthInterceptorService } from './services/auth/auth-interceptor.service';
import { MatChipsModule } from '@angular/material/chips';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';

import { MatTabsModule } from '@angular/material/tabs';
import { ViewPostsComponent } from './pages/view-posts/view-posts.component';
import { PostListComponent } from './components/posts/post-list/post-list.component';
import { TrendingPostsComponent } from './components/posts/trending-posts/trending-posts.component';
import { FeedPostsComponent } from './components/posts/feed-posts/feed-posts.component';
import { FollowingPostsComponent } from './components/posts/following-posts/following-posts.component';

import { ResetPasswordComponent } from './pages/verify-account/reset-password/reset-password.component';
import { NewPasswordComponent } from './pages/verify-account/new-password/new-password.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    ProfileComponent,
    NotificationTypeComponent,
    NavbarComponent,
    NotfoundComponent,
    PostsContainerComponent,
    PostComponent,
    PostListComponent,
    NotificationPanelComponent,
    NotificationMessageComponent,
    FollowComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ProfileSelectorComponent,
    ThemeSwitcherComponent,
    ViewPostsComponent,
    TrendingPostsComponent,
    FeedPostsComponent,
    FollowingPostsComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatListModule,
    MatBadgeModule,
    MatIconModule,
    MatFormFieldModule,
    NgxDropzoneModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatMenuModule,
    MatSelectModule,
    ToastModule,
    MatChipsModule,
    MatTabsModule,
    MatDialogModule,
  ],
  providers: [
    RouteguardService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    MessageService,
    NgEventBus,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
