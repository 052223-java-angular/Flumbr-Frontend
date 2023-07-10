import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-posts-container',
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.css'],
})
export class PostsContainerComponent {
  constructor(private notificationService: NotificationService) {}

  activeTab: string = 'default';

  activateTab(changeEvent: MatTabChangeEvent) {
    if (changeEvent.tab.textLabel == 'Feed') {
      this.activeTab = 'default';
    } else {
      this.activeTab = changeEvent.tab.textLabel;
    }
    this.notificationService.raiseStateIsReloading(true);
  }

  /*----------------------------------------------------------------------->
  /**
   * This class is now a container just to display different types of posts components using tab navigation. So logic below should be placed in seperate posts components (e.g. trending posts component). The component selectors for different types of post components will be inserted in the html of this component though.
   */
  // posts!: Array<PostRes>;
  // @Input() profile: boolean = false;
  // constructor(private postService: PostService) {}
  // ngOnInit(): void {
  //   this.getPosts();
  // }
  // getPosts() {
  //   this.postService.getPosts().subscribe({
  //     next: (res) => {
  //       this.posts = res;
  //       console.log(res);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }
  // searchByUsername(username: string): Array<PostRes> {
  //   let postsByUser: Array<PostRes> = [];
  //   for (let post of this.posts) {
  //     if (post.username === username) {
  //       postsByUser.push(post);
  //     }
  //   }
  //   return postsByUser;
  // }
  // searchByTags(tagName: string): Array<PostRes> {
  //   let postsByTag: Array<PostRes> = [];
  //   for (let post of this.posts) {
  //     if (post.tags !== undefined) {
  //       for (let tag of post.tags) {
  //         if (tag.name === tagName) {
  //           postsByTag.push(post);
  //         }
  //       }
  //     }
  //   }
  //   return postsByTag;
  // }
  // deletePostById(id: string) {
  //   for (let post of this.posts) {
  //     if (post.id === id) {
  //       this.postService.deletePostById(id);
  //     }
  //   }
  // }
  // editPostById(id: string, content: string) {
  //   for (let post of this.posts) {
  //     if (post.id == id) {
  //       if (post.message !== undefined) {
  //         post.message = content;
  //         return post;
  //       }
  //     }
  //   }
  //   return undefined;
  // }
}
