import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  loading: boolean = false;
  postForm!: FormGroup;
  shortLink: string | null = null;
  message: string = '';
  files: File[] = [];
  isImage: boolean = false;
  isVideo: boolean = false;
  tags: string[] = [];

  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileUploadService
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
      console.log(file);
      this.postForm.patchValue({
        file: file,
      });
    }
    this.setImageAndVideoFlags();
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.setImageAndVideoFlags();
    this.shortLink = null;
    this.postForm.patchValue({
      file: null,
    });
  }

  onUpload() {
    if (this.files.length > 0) {
      this.loading = !this.loading;
      this.fileUploadService.upload(this.files[0]).subscribe((event: any) => {
        if (typeof event === 'object') {
          this.shortLink = event.link;
          this.loading = false;
        }
      });
    }
  }

  onMessageChange(message: string) {
    // get all strings that begin with #
    let tags: string[] | null = message.match(/#[A-Za-z0-9]+/gi);

    if (tags) {
      this.tags = tags;
    } else {
      this.tags = [];
    }
  }

  submitPostForm() {}
}
