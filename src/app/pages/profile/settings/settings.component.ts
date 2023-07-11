import { Component } from '@angular/core';
import {ProfileService} from "../../../services/profile-service";
import {PostService} from "../../../services/post/post.service";
import {ActivatedRoute} from "@angular/router";
import {TokenService} from "../../../services/tokenservice.service";
import {ProfilePayload} from "../../../models/profile/profile-payload";
import {PostRes} from "../../../models/post/post";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {BioPayload} from "../../../models/profile/bio-payload";
import { Location} from "@angular/common";
import {AppSettings} from "../../../global/app-settings";
import {finalize} from "rxjs";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  profile!: ProfilePayload;
  user_id!: any;
  modifyBio: boolean = false;
  follow: boolean = false;
  posts!: Array<PostRes>;
  theme: string = "default";

  //utilize file upload service
  imageForm!: FormGroup;
  files: File[] = [];
  isImage: boolean = false;
  shortLink: string | null = null;
  loading: boolean = false;
  fileSizeLimit: number = AppSettings.CREATE_POST_SIZE_LIMIT;

  // get session id
  sessionId: any;

  // bio form
  changeBioForm = new FormGroup({
    bio: new FormControl(null)
  })


  constructor(private profileService: ProfileService,
              private postService: PostService,
              private tokenService: TokenService,
              private _location: Location,
              private messageService: MessageService,
              private fb: FormBuilder
  ) {
    this.sessionId = this.tokenService.getUser().id
    console.log(this.sessionId)
  }

  backClicked() {
    this._location.back();
  }


  ngOnInit () {
    this.profileService.getUser(this.sessionId).subscribe( {

      next: (resp: any) => {
        this.profile = resp;
        this.theme = this.profile.themeName;
        console.log(this.profile);
      },
      error: (err) => {
        console.error("Issue with retrieving profile details.");
        console.log("Error retrieving user with id: "  + this.user_id + " : " + err);
      }
    });

    this.imageForm = this.fb.group(
      {
        file: [''],
      }
    );

  }

  submitForm(): void {
    if (!this.changeBioForm.valid) {
      console.log("bio form not set")
    }
    // create a biography payload to send to the back end
    const payload: BioPayload = {
      profileId: this.profile.profileId,
      bio: this.changeBioForm.controls.bio.value!,
      themeName: ""
    }
    // setting bio for local test
    this.profile.bio = payload.bio;

    console.log("Session id: " + this.tokenService.getUser().id )

    // send new bio to backend
    this.profileService.updateUserBio(this.tokenService.getUser().id, payload).subscribe( {

      next: (resp: any) => {
        this.profile = resp;
        this.theme = this.profile.themeName;
        console.log(this.profile);
      },
      error: (err) => {
        console.error("Issue with retrieving profile details.");
        console.log("Error retrieving user with id: "  + this.user_id + " : " + err);
      }
    })

    console.log("New bio is: " + payload.bio);
  }

  selectTheme(choice: string) {
    this.theme = choice;

    // create a theme payload to send to the back end
    const payload: BioPayload = {
      profileId: this.profile.profileId,
      bio: this.changeBioForm.controls.bio.value!,
      themeName: choice
    }

    // send new bio to backend
    this.profileService.updateTheme(this.tokenService.getUser().id, payload).subscribe( {

      next: (resp: any) => {

        console.log("Theme has successfully been set");
        this.theme = payload.themeName;
      },
      error: (err) => {
        console.error("Issue with retrieving profile details.");
        console.log("Error retrieving user with id: "  + this.user_id + " : " + err);
      }
    })

  }

  // event when adding folder into drop down
  onSetImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      //this.uploadForm.get().setValue(file);
    }
    this.files.push(...event.addedFiles);
    if (this.files.length > 1) {
      this.files.splice(0, 1);
    }
    this.setImageFlags();
  }

  // flag for image type
  setImageFlags() {
    if (this.files.length == 1) {
      const file = this.files[0];
      const fileType = file['type'];
      const imageRegEx = /image/;
      this.isImage = imageRegEx.test(fileType);
    } else {
      this.isImage = false;
    }
  }

  // selecting file
  onSelectFile(event: any) {
    this.files.push(...event.addedFiles);
    if (this.files.length > 1) {
      this.files.splice(0, 1);
    }
    if (this.files.length > 0) {
      const file = this.files[0];
      this.imageForm.patchValue({
        file: file,
      });
    }
    this.setImageFlags();
    if (!this.isImage) {
      if (this.files.length > 0) {
        this.files = [];
        this.imageForm.patchValue({
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
    this.setImageFlags();
    this.shortLink = null;
    this.imageForm.patchValue({
      file: null,
    });
  }

  uploadImage() {
    this.loading = true;

    let formData = new FormData();

    /*const message = this.imageForm.controls['message'].value;

    if (message) {
      formData.append('message', message);
      const uniqueTags = [...new Set(this.tags)];
      for (let i = 0; i < uniqueTags.length; i++) {
        formData.append('tags', uniqueTags[i]);
      }
    }*/

    const file = this.imageForm.controls['file'].value;
    if (file) {
      formData.append('file', file, file.name);
      formData.append('mediaType', file['type']);
    }/* else {
      if (message) {
        formData.append('mediaType', 'text');
      }
    }*/

    this.profileService
      .uploadImage(formData)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (/* value */) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Post created',
            life: AppSettings.DEFAULT_MESSAGE_LIFE,
          });
          this.imageForm.reset();
          this.files = [];
          this.setImageFlags();
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
