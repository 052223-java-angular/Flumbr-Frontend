import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  loading: boolean = false;
  shortLink: string | null = null;
  message: string = '';
  files: File[] = [];
  isImage: boolean = false;
  isVideo: boolean = false;
  tags: string[] = [];

  constructor(private fileUploadService: FileUploadService) {}

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

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    if (this.files.length > 1) {
      this.files.splice(0, 1);
    }
    this.setImageAndVideoFlags();
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.setImageAndVideoFlags();
    this.shortLink = null;
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
}
