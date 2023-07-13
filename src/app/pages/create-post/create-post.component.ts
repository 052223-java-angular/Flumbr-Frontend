import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { AppSettings } from 'src/app/global/app-settings';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgEventBus } from 'ng-event-bus';
import { EventBusEvents } from 'src/app/global/event-bus-events';
import { EditPostDialogData } from 'src/app/models/post/edit-post-dialog-data';
import { PostRes } from 'src/app/models/post/post';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  loading: boolean = false;
  fileSizeLimit: number = AppSettings.CREATE_POST_SIZE_LIMIT;
  postForm!: FormGroup;
  files: File[] = [];
  isImage: boolean = false;
  isVideo: boolean = false;
  tags: string[] | null = [];
  mentions: string[] | null = [];
  editPost: PostRes | null = null;
  isGifComponentOpen: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreatePostComponent>,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private postService: PostService,
    private eventBus: NgEventBus,
    @Inject(MAT_DIALOG_DATA) public data: EditPostDialogData
  ) {}

  atLeastOneValidator = (keys: string[]) => {
    return (group: FormGroup) => {
      const { controls } = group;
      return keys.some((key) => controls[key] && !!controls[key].value)
        ? null
        : { atLeastOne: 'error' };
    };
  };

  async ngOnInit(): Promise<void> {
    if (this.data) {
      this.postForm = this.fb.group(
        {
          message: [this.data.post.message || ''],
          file: [''],
        },
        { validators: this.atLeastOneValidator(['message', 'file']) }
      );
      const messageFormControl = this.postForm.get('message');
      if (messageFormControl) {
        messageFormControl.valueChanges.subscribe((value) => {
          this.onMessageChange(value);
        });
      }
    } else {
      this.postForm = this.fb.group(
        {
          message: [''],
          file: [''],
        },
        { validators: this.atLeastOneValidator(['message', 'file']) }
      );
      const messageFormControl = this.postForm.get('message');
      if (messageFormControl) {
        messageFormControl.valueChanges.subscribe((value) => {
          this.onMessageChange(value);
        });
      }
    }

    if (this.data) {
      if (this.data.post.s3Url) {
        const media = await this.fetchBlob(this.data.post.s3Url);
        const file = new File([media], 'file', {
          type: this.data.post.mediaType,
        });
        this.postForm.patchValue({
          file: file,
        });
        this.files = [file];
        this.setImageAndVideoFlags();
        if (this.data.post.message) {
          this.onMessageChange(this.data.post.message);
        }
      }
    }
  }

  setImageAndVideoFlags() {
    if (this.files.length == 1) {
      const file = this.files[0];
      const fileType = file['type'];
      const imageRegEx = /image/;
      const videoRegEx = /video/;
      this.isImage = imageRegEx.test(fileType);
      this.isVideo = videoRegEx.test(fileType);
    } else {
      this.isImage = false;
      this.isVideo = false;
    }
  }

  onSelectFile(event: any) {
    this.files.push(...event.addedFiles);
    if (this.files.length > 1) {
      this.files.splice(0, 1);
    }
    if (this.files.length > 0) {
      const file = this.files[0];
      this.postForm.patchValue({
        file: file,
      });
    }
    this.setImageAndVideoFlags();
    if (!this.isImage && !this.isVideo) {
      if (this.files.length > 0) {
        this.files = [];
        this.postForm.patchValue({
          file: null,
        });
        this.messageService.add({
          severity: 'warn',
          summary: 'Warning',
          detail: 'Only images and videos currently supported',
          life: AppSettings.DEFAULT_MESSAGE_LIFE,
        });
      }
    }
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.setImageAndVideoFlags();
    this.postForm.patchValue({
      file: null,
    });
  }

  onMessageChange(message: string) {
    // get all strings that begin with #
    this.tags = message
      ? (message.match(/#[A-Za-z0-9]+/gi)! || []).map((x) => x.slice(1))
      : [];
    this.mentions = message
      ? (message.match(/@[A-Za-z0-9._]+/gi)! || []).map((x) => x.slice(1))
      : [];
  }

  submitPostForm() {
    this.loading = true;

    let formData = new FormData();

    const message = this.postForm.controls['message'].value;
    if (message) {
      formData.append('message', message);
      const uniqueTags = [...new Set(this.tags)];
      for (let i = 0; i < uniqueTags.length; i++) {
        formData.append('tags', uniqueTags[i]);
      }
      const uniqueMentions = [...new Set(this.mentions)];
      for (let i = 0; i < uniqueMentions.length; i++) {
        formData.append('mentions', uniqueMentions[i]);
      }
    }

    const file = this.postForm.controls['file'].value;
    if (file) {
      formData.append('file', file, file.name);
      formData.append('mediaType', file['type']);
    } else {
      if (message) {
        formData.append('mediaType', 'text');
      }
    }

    if (!this.data) {
      this.postService
        .createPost(formData)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe({
          next: (/* value */) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Post created',
              life: AppSettings.DEFAULT_MESSAGE_LIFE,
            });
            this.postForm.reset();
            this.files = [];
            this.setImageAndVideoFlags();
            this.tags = [];
            this.eventBus.cast(EventBusEvents.POST_CREATE, '');
            this.router.navigate(['/posts']);
            this.dialogRef.close([]);
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error.message || 'Error',
              life: AppSettings.DEFAULT_MESSAGE_LIFE,
            });
          },
        });
    } else {
      this.postService
        .updatePost(this.data.post.id, formData)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe({
          next: (/* value */) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Post updated',
              life: AppSettings.DEFAULT_MESSAGE_LIFE,
            });
            this.postForm.reset();
            this.files = [];
            this.setImageAndVideoFlags();
            this.tags = [];
            this.eventBus.cast(EventBusEvents.POST_UPDATE, '');
            this.router.navigate(['/posts']);
            this.dialogRef.close([]);
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error.message || 'Error',
              life: AppSettings.DEFAULT_MESSAGE_LIFE,
            });
          },
        });
    }
  }

  onCancelClick(event: any): void {
    event.preventDefault();
    this.dialogRef.close([]);
  }

  async fetchBlob(url: string) {
    const response = await fetch(url);
    return response.blob();
  }

  addEmoji(emoji: string) {
    const control = this.postForm.controls['message'];
    control.setValue((control.value ? control.value : '') + emoji);
  }

  toggleGifComponent() {
    this.isGifComponentOpen = !this.isGifComponentOpen;
  }

  async addGif(gifChosen: string) {
    const media = await this.fetchBlob(gifChosen);
    const file = new File([media], 'file', {
      type: 'image/gif',
    });
    this.postForm.patchValue({
      file: file,
    });
    this.files = [file];
    this.setImageAndVideoFlags();
    this.toggleGifComponent();
  }
}
