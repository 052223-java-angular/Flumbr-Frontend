import { Component, OnInit } from '@angular/core';
import { FollowService } from "../../../services/follow/follow.service";
import { ProfileService } from "../../../services/profile-service";
import { GetProfileInterests } from "../../../models/tag/get-profile-interests";
import { TokenService } from "../../../services/tokenservice.service";
import { PotentialFollowRequestPayload } from "../../../models/potential-follow-request-payload";

@Component({
  selector: 'app-user-recommendations',
  templateUrl: './user-recommendations.component.html',
  styleUrls: ['./user-recommendations.component.scss'],
})
export class UserRecommendationsComponent implements OnInit {
  users: any = [];
  tags: any = [];


  constructor(
    private followService: FollowService,
    private profileService: ProfileService,
    private tokenService: TokenService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getUserTags();
  }

  async getUserTags(): Promise<void> {
    const userId = this.tokenService.getUser().user_id;
    const profileId = this.tokenService.getUser().profile_id;

    const payload: GetProfileInterests = {
      user_id: "c1f3824c-21b0-405e-b3c8-ea216e975b94",
      profile_id: "be139b97-7284-49f9-8aa3-bebb245d1507",
      tag_name: ""
    };

    await this.profileService.getUserTags(payload).subscribe({
      next: (data: any) => {
        console.log(data.tags);
        this.tags = data.tags;
        const tagNames: string[] = this.tags.map((tag: any) => tag.name);
        this.getRecommendedFollowers(tagNames);
      }
    });
  }

  getRecommendedFollowers(tagNames: string[]) {
    const payload: PotentialFollowRequestPayload = {
      tagList: tagNames,
      userId: "c1f3824c-21b0-405e-b3c8-ea216e975b94",
      username: "jesserib"
    };

    console.log(payload);
    this.followService.potentialFollowers(payload).subscribe({
      next: (data: any) => {
        console.log(data);


        data.forEach((user: any) => {


          this.users.push(user);
        });

      }
    });
  }
}
