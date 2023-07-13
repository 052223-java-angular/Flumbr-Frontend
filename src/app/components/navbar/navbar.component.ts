import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/tokenservice.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from 'src/app/pages/create-post/create-post.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userId!: string;
  userName!: string;
  role!: string;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  notificationHasChanged: boolean = false;

  ngOnInit(): void {
    this.userId = this.tokenService.getUser().id;
    this.userName = this.tokenService.getUser().username;
    this.role = this.tokenService.getUser().role;
    console.log(this.role);

    this.notificationService.stateIsReload.subscribe((stateIsLoading) => {
      this.notificationHasChanged = stateIsLoading;
      setTimeout(() => {
        this.notificationHasChanged = !this.notificationHasChanged;
      }, 100);
    });
  }

  login() {}

  logout() {
    this.tokenService.signOut();
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.tokenService.isLoggedIn();
  }

  getUsername() {
    return this.tokenService.getUser().username;
  }

  routeToProfile() {
    let userId: string = this.tokenService.getUser().id;

    this.router.navigate([`/profile/${userId}`]);
  }

  openPostDialog(): void {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      width: '600px',
      maxHeight: '800px',
    });

    dialogRef.afterClosed().subscribe(() => {});
  }


}
