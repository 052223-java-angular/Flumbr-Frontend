import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { PostRes } from 'src/app/models/post/post';
import { PostService } from 'src/app/services/post/post.service';
import { TokenService } from 'src/app/services/tokenservice.service';
import { Vote } from 'src/app/models/post/vote';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from 'src/app/pages/create-post/create-post.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { ReportComponent } from '../../report/report.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostComponent implements OnInit {
  @Input() post!: PostRes;
  isChatOpen = false;
  isGifComponentOpen = false;
  isEmojiMartOpen = false;
  chosenGif: string | null = null;
  commentForm!: FormGroup;
  thumbsUpEnabled: boolean = true;
  thumbsDownEnabled: boolean = true;

  constructor(
    private postService: PostService,
    private tokenService: TokenService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.updateIconState();
    this.commentForm = new FormGroup({
      comment: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.maxLength(500)])
      ),
    });
  }

  updateIconState() {
    console.log('update icon state ');
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
  }

  onCommentSubmit() {
    console.log(this.commentForm);
  }

  addGif(gifChosen: string) {
    this.chosenGif = gifChosen;
    this.toggleGifComponent();
  }

  removeGif() {
    this.chosenGif = null;
  }

  toggleGifComponent() {
    if (this.isEmojiMartOpen) {
      this.isEmojiMartOpen = false;
    }
    this.isGifComponentOpen = !this.isGifComponentOpen;
  }

  addEmoji(emoji: string) {
    console.log(emoji);
    const control = this.commentForm.controls['comment'];
    control.setValue((control.value ? control.value : '') + emoji);
  }

  toggleEmojiMart() {
    this.isEmojiMartOpen = !this.isEmojiMartOpen;
  }

  navigateToTag(id: string) {
    console.log(id);
  }

  navigateToUser(id: string) {
    console.log(id);
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
      next: (/* value */) => {
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
