import { Component } from '@angular/core';
import {ProfilePayload} from "../../models/profile/profile-payload";
import {TagPayload} from "../../models/tag-payload";
import {ProfileService} from "../../services/profile-service";
import {FormControl, FormGroup} from "@angular/forms";
import {BioPayload} from "../../models/profile/bio-payload";
import {PostService} from "../../services/post/post.service";
import {PostRes} from "../../models/post/post";
import {ActivatedRoute} from "@angular/router";
import {TokenService} from "../../services/tokenservice.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
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

  tags: TagPayload[] = [];

  constructor(private profileService: ProfileService,
              private postService: PostService,
              private route: ActivatedRoute,
              private tokenService: TokenService
              ) {

    this.user_id = this.route.snapshot.params['userId']
    this.sessionId = this.tokenService.getUser().id
    console.log(this.sessionId)
  }

  // Retrieve profile information of user
  ngOnInit () {
    this.profileService.getUser(this.user_id).subscribe( {

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

  scrollTop() {
    //this.document.documentElement.scrollTop = 0;
  }

  // boolean toggle for modifying biography
  modifyProfileBio() {
    this.modifyBio = !this.modifyBio;
    console.log("toggle modifying bio to: " + this.modifyBio)
  }

  // submits form for biography
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

    // leave modify after accepting
    this.modifyProfileBio();

    console.log("New bio is: " + payload.bio);
  }

  // css theme selector
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
    this.setImageAndVideoFlags();
  }


  //
  setImageAndVideoFlags() {
    if (this.files.length == 1) {
      const file = this.files[0];
      const fileType = file['type'];
      const imageRegEx = /image/;
      this.isImage = imageRegEx.test(fileType);
    } else {
      this.isImage = false;
    }
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.setImageAndVideoFlags();
    this.shortLink = null;
  }



  followToggle() {
    this.follow = !this.follow;
  }


  // run this after initial data gather: use if dependent on get profiles
  ngAfterInit() {

  }

}
