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

  // boolean toggle for modifying biography
  modifyProfileBio() {
    this.modifyBio = !this.modifyBio;
    console.log("toggle modifying bio to: " + this.modifyBio)
  }






  followToggle() {
    this.follow = !this.follow;
  }


  // run this after initial data gather: use if dependent on get profiles
  ngAfterInit() {

  }

}
