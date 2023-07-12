import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { PostRes } from 'src/app/models/post/post';
import { PostService } from 'src/app/services/post/post.service';
import { TokenService } from 'src/app/services/tokenservice.service';
import { Vote } from 'src/app/models/post/vote';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from 'src/app/pages/create-post/create-post.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Comment, NewCommentReq } from 'src/app/models/post/comment';
import { MessageService } from 'primeng/api';
import { AppSettings } from 'src/app/global/app-settings';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ReportComponent } from '../../report/report.component';
import { Bookmark } from '../../../models/post/bookmark';
import { RemoveBookmark } from '../../../models/post/removeBookmark';
import { ProfileService } from 'src/app/services/profile-service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostComponent implements OnInit {
  @Input() post!: PostRes;
  @Input() isChatOpen = false;
  @Input() disableCommentMaxHeight = false;
  isGifComponentOpen = false;
  chosenGif: string | null = null;
  commentForm!: FormGroup;
  thumbsUpEnabled: boolean = true;
  thumbsDownEnabled: boolean = true;

  shareURL: string = '';

  // variables used by bookmark
  sessionId!: string;
  bookmarked!: boolean;
  loading: boolean = false;

  constructor(
    private postService: PostService,
    private tokenService: TokenService,
    private dialog: MatDialog,
    private messageService: MessageService,
    private profileService: ProfileService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sessionId = this.tokenService.getUser().id;
    this.updateIconState();

    console.log('Session id: ' + this.sessionId);

    this.commentForm = new FormGroup(
      {
        comment: new FormControl(null, Validators.maxLength(4000)),
        gifUrl: new FormControl(null),
      },
      {
        validators: this.atLeastOne(Validators.required, ['comment', 'gifUrl']),
      }
    );
    const urlParts = location.href.split('/');
    this.shareURL = `${urlParts[0]}//${urlParts[2]}/posts/${this.post.id}`;
  }

  // custom validator
  atLeastOne(validator: ValidatorFn, controls: string[] | null = null): any {
    return (group: FormGroup): ValidationErrors | null => {
      if (!controls) {
        controls = Object.keys(group.controls);
      }

      const hasAtLeastOne =
        group &&
        group.controls &&
        controls.some((k) => !validator(group.controls[k]));

      return hasAtLeastOne
        ? null
        : {
            atLeastOne: true,
          };
    };
  }

  updateIconState() {
    // console.log('update icon state ');
    if (this.post && this.post.userVote) {
      if (this.post.userVote.vote === true) {
        this.thumbsUpEnabled = false;
        this.thumbsDownEnabled = true;
      } else if (this.post.userVote.vote === false) {
        this.thumbsUpEnabled = true;
        this.thumbsDownEnabled = false;
      }
    } else {
      this.thumbsUpEnabled = true; // Default state when userVote is null or post is undefined
      this.thumbsDownEnabled = true; // Default state when userVote is null or post is undefined
    }

    // bookmark icons
    if (this.post && this.post.bookmarked) {
      // if bookmark has bookmark id that matches
      this.bookmarked = true;
    } else {
      this.bookmarked = false; // set bookmarked false for this post
    }
  }

  onCommentSubmit() {
    if (this.commentForm.invalid) {
      return;
    }

    // create comment payload
    const commentPayload: NewCommentReq = {
      comment: this.commentForm.controls['comment'].value,
      postId: this.post.id,
      userId: this.tokenService.getUser().id,
    };

    if (this.chosenGif) {
      commentPayload.gifUrl = this.chosenGif;
    }

    if (this.commentForm.controls['comment'].value) {
      commentPayload.comment = this.commentForm.controls['comment'].value;
    } else {
      commentPayload.comment = '';
    }

    // attempt db creation of comment
    this.postService.createComment(commentPayload).subscribe({
      next: () => {
        // create new comment
        const newComment: Comment = {
          username: this.tokenService.getUser().username,
          createTime: new Date().toISOString(),
          postId: this.post.id,
        };

        // add in gifs and comments if present
        if (this.chosenGif) {
          newComment.gifUrl = this.chosenGif;
        }
        if (commentPayload.comment) {
          newComment.comment = commentPayload.comment;
        }

        // add in profile img
        this.profileService.setLocalStorageProfileImg();
        newComment.profileImg = localStorage.getItem('profileImg') as string;

        // comments present so push new comment
        if (this.post.comments && this.post.comments.length > 0) {
          this.post.comments.push(newComment);
        }
        // no comments present so create new comment arr
        else {
          this.post.comments = [newComment];
        }

        // toaster responses
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Successful comment creation!',
          life: AppSettings.DEFAULT_MESSAGE_LIFE,
        });

        // reset gif
        this.chosenGif = '';

        // clear form
        this.commentForm.reset();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
          life: AppSettings.DEFAULT_MESSAGE_LIFE,
        });

        // reset gif
        this.chosenGif = '';

        // clear form
        this.commentForm.reset();
      },
    });
  }

  addGif(gifChosen: string) {
    this.chosenGif = gifChosen;
    this.commentForm.controls['gifUrl'].setValue(gifChosen);
    this.toggleGifComponent();
  }

  removeGif() {
    this.chosenGif = null;
    this.commentForm.controls['gifUrl'].setValue(null);
  }

  toggleGifComponent() {
    this.isGifComponentOpen = !this.isGifComponentOpen;
  }

  addEmoji(emoji: string) {
    const control = this.commentForm.controls['comment'];
    control.setValue((control.value ? control.value : '') + emoji);
  }

  navigateToTag(id: string) {
    console.log(id);
  }

  navigateToUser(id: string) {
    this.router.navigateByUrl(`/profile/${id}`);
  }

  likePost(id: string) {
    console.log('id is ' + id);
    console.log('userId is ' + this.tokenService.getUser().id);

    // The payload to be sent to the backend API
    const payload: Vote = {
      vote: true,
      postId: id,
      userId: this.tokenService.getUser().id,
    };

    // Call the post service to like the post.
    this.postService.votePost(payload).subscribe({
      next: (/* value */) => {
        //TODO: Call toaster service to msg?
        console.log('voted like for postId ' + id);
        this.thumbsUpEnabled = false; // Disable thumbs-up icon
        this.thumbsDownEnabled = true; // Enable thumbs-down icon

        const updatedLikesCount = this.post.upVotes + 1;
        // Update the likes count in the post object
        this.post.upVotes = updatedLikesCount;

        if (this.post.downVotes > 0) {
          this.post.downVotes = this.post.downVotes - 1;
        }
      },
      error: (error) => {
        console.log('error in setting vote ' + error);
      },
    });
  }

  // bookmark a post if a user has not bookmarked it
  bookmarkPost(id: string) {
    console.log('post id is ' + id);
    this.loading = true;

    // define book mark payload
    const payload: Bookmark = {
      postId: id,
      userId: this.tokenService.getUser().id,
    };

    // call bookmark service
    this.postService.bookmarkPost(payload).subscribe({
      next: () => {
        console.log('Bookmark service hit, setting bookmark');
        this.bookmarked = true;
        this.loading = false;
      },
      error: (err) => {
        console.log('error in bookmarking post: ' + err);
        this.loading = false;
      },
    });
  }

  // remove bookmark if user has bookmarked post
  removeBookmark(id: string) {
    this.loading = true;

    // define book mark payload
    const payload: RemoveBookmark = {
      bookmarkId: this.post.bookmarked?.id!,
      postId: id,
      userId: this.tokenService.getUser().id,
    };

    // call bookmark service
    this.postService.removeBookmark(payload).subscribe({
      next: () => {
        console.log('Remove Bookmark service hit');
        this.bookmarked = false;
        this.loading = false;
      },
      error: (err) => {
        console.log('error in removing post bookmark: ' + err);
        this.loading = false;
      },
    });
  }

  dislikePost(id: string) {
    console.log('id  is ' + id);

    // The payload to be sent to the backend API
    const payload: Vote = {
      vote: false,
      postId: id,
      userId: this.tokenService.getUser().id,
    };

    // Call the post service to like the post.
    this.postService.votePost(payload).subscribe({
      //Remember to comment out the value when
      next: (value) => {
        //TODO: Call toaster service to msg?
        console.log('voted dislike for postId ' + id);
        this.thumbsUpEnabled = true; // Disable thumbs-up icon
        this.thumbsDownEnabled = false; // Enable thumbs-down icon

        const updatedDislikedCount = this.post.downVotes + 1;

        // Update the dislikes count in the post object
        this.post.downVotes = updatedDislikedCount;

        if (this.post.upVotes > 0) {
          this.post.upVotes = this.post.upVotes - 1;
        }
      },
      error: (error) => {
        console.log('error in setting vote ' + error);
      },
    });
  }

  /**
   * @param payload -
   */
  votePost(payload: Vote): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/vote/post`, payload);
  }

  sharePost() {
    console.log('sharing');
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  reportPost(id: any) {
    console.log(id);
    this.dialog.open(ReportComponent, {
      width: '40%',
      data: {
        id: id,
      },
    });
  }

  //I need this for my delete button that Im putting in the menu
  getUsername(): string {
    return this.tokenService.getUser().username;
  }

  openEditPostModal(post: PostRes): void {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      width: '600px',
      maxHeight: '800px',
      data: {
        post: post,
      },
      scrollStrategy: new NoopScrollStrategy(),
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('dialog closed');
    });
  }

  canEditPost(post: PostRes): boolean {
    return this.tokenService.getUser().id === post.userId;
  }
}
