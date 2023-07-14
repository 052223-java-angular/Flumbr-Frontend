import { Component } from '@angular/core';
import {ProfilePayload} from "../../models/profile/profile-payload";
import {TagPayload} from "../../models/tag-payload";
import {ProfileService} from "../../services/profile-service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
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
  username!: string;


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
  tagsForm!: FormGroup;

  constructor(private profileService: ProfileService,
              private postService: PostService,
              private route: ActivatedRoute,
              private tokenService: TokenService,
              private fb: FormBuilder
              ) {

    // this.user_id = this.route.snapshot.params['userId']
    // this.sessionId = this.tokenService.getUser().id
    // console.log(this.sessionId)
  }

  // Retrieve profile information of user
  ngOnInit () {
    this.user_id = this.route.snapshot.params['userId'] // Id of the user from profile
    this.sessionId = this.tokenService.getUser().id //id from the logged in user/client

    // store users tags if exists
    this.tagsForm = this.fb.group({
      tags: [[]],
    });

    this.profileService.getUser(this.user_id).subscribe( {

      next: (resp: any) => {
        this.profile = resp;
        this.theme = this.profile.themeName;
        console.log(this.profile);

        this.loadProfileTags();
      },
      error: (err) => {
        console.error("Issue with retrieving profile details.");
        console.log("Error retrieving user with id: "  + this.user_id + " : " + err);
      }
    });


  }

  loadProfileTags() {
    console.log('profile id is: ' + this.profile.profileId)
    this.profileService.getTags(this.profile.profileId).subscribe({
      next: (data: any) => {
        this.tags = data.tags;
        console.log('Returned tags are: '+data.tags);
        this.tagsForm.patchValue({
          tags: this.tags,
        });

      },
      error: (err) => {
        console.log(err);
      },
    });

    console.log(this.tags)
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
