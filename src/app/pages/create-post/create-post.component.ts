import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgEventBus } from 'ng-event-bus';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { AppSettings } from 'src/app/global/app-settings';
import { EventBusEvents } from 'src/app/global/event-bus-events';
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
  shortLink: string | null = null;
  files: File[] = [];
  isImage: boolean = false;
  isVideo: boolean = false;
  tags: string[] | null = [];

  constructor(
    public dialogRef: MatDialogRef<CreatePostComponent>,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private postService: PostService,
    private eventBus: NgEventBus
  ) {}

  atLeastOneValidator = (keys: string[]) => {
    return (group: FormGroup) => {
      const { controls } = group;
      return keys.some((key) => controls[key] && !!controls[key].value)
        ? null
        : { atLeastOne: 'error' };
    };
  };

  ngOnInit(): void {
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
    this.shortLink = null;
    this.postForm.patchValue({
      file: null,
    });
  }

  onMessageChange(message: string) {
    // get all strings that begin with #
    this.tags = message
      ? (message.match(/#[A-Za-z0-9]+/gi)! || []).map((x) => x.slice(1))
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
  }

  onCancelClick(event: any): void {
    event.preventDefault();
    this.dialogRef.close([]);
  }
}
