import { Component } from '@angular/core';
import {ProfilePayload} from "../../models/profile-payload";
import {TagPayload} from "../../models/tag-payload";
import {ProfileService} from "../../services/profile-service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profile!: ProfilePayload;
  tags: TagPayload[] = [];

  constructor(private profileService: ProfileService) { }

  // Retrieve profile information
  ngOnInit () {
    console.log("testing profile")

    this.profileService.getUserTest().subscribe( {

      next: (resp: any) => {
        this.profile = resp;
        console.log(this.profile);
      },
      error: (err) => {
        console.error("Issue with retrieving profile details");
        console.log(err);
      }
    })
  }

  // run this after initial data gather: use if dependent on get profiles

  ngAfterInit() {

    /*this.profileService.getUserTest().subscribe( {

      next: (resp: any) => {
        this.profile = resp.data;
      },
      error: (err) => {
        console.error("Issue with retrieving profile details");
        console.log(err);
      }
    })*/

  }

}
