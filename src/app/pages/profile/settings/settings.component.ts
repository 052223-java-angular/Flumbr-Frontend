import { Component } from '@angular/core';
import {ProfileService} from "../../../services/profile-service";
import {PostService} from "../../../services/post/post.service";
import {ActivatedRoute} from "@angular/router";
import {TokenService} from "../../../services/tokenservice.service";
import {ProfilePayload} from "../../../models/profile/profile-payload";
import {PostRes} from "../../../models/post/post";
import {FormControl, FormGroup} from "@angular/forms";
import {BioPayload} from "../../../models/profile/bio-payload";
import { Location} from "@angular/common";

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
  files: File[] = [];
  isImage: boolean = false;
  shortLink: string | null = null;

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
    })
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

}
