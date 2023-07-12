import {Component, OnInit} from '@angular/core';
import {FollowService} from "../../../services/follow/follow.service";
import {ProfileService} from "../../../services/profile-service";
import {GetProfileInterests} from "../../../models/tag/get-profile-interests";

@Component({
  selector: 'app-user-recommendations',
  templateUrl: './user-recommendations.component.html',
  styleUrls: ['./user-recommendations.component.scss'],
})
export class UserRecommendationsComponent implements OnInit{
  /**
  users = [
    {
      id: 'tom-myspace',
      username: 'MySpace Tom',
      profile: {
        profile_img:
          'https://i.insider.com/4efd9b8b69bedd682c000022?width=1300&format=jpeg&auto=webp',
        bio: "Hi, I'm Tom!",
        theme: '',
      },
    },
    {
      id: 'squidward',
      username: 'Squidward',
      profile: {
        profile_img:
          'https://static.wikia.nocookie.net/76b2e582-cb23-47eb-980f-46be017c86bc/scale-to-width/370',
        bio: 'I order the food, you cook the food, the customer gets the food.',
        theme: '',
      },
    },
    {
      id: 'gigachad',
      username: 'Gigachad',
      profile: {
        profile_img:
          'https://i.kym-cdn.com/entries/icons/original/000/026/152/gigachadd.jpg',
        bio: 'Average enjoyer',
        theme: '',
      },
    },
    {
      id: 'tom-myspace',
      username: 'MySpace Tom',
      profile: {
        profile_img:
          'https://i.insider.com/4efd9b8b69bedd682c000022?width=1300&format=jpeg&auto=webp',
        bio: "Hi, I'm Tom!",
        theme: '',
      },
    },
    {
      id: 'squidward',
      username: 'Squidward',
      profile: {
        profile_img:
          'https://static.wikia.nocookie.net/76b2e582-cb23-47eb-980f-46be017c86bc/scale-to-width/370',
        bio: 'I order the food, you cook the food, the customer gets the food.',
        theme: '',
      },
    },
    {
      id: 'gigachad',
      username: 'Gigachad',
      profile: {
        profile_img:
          'https://i.kym-cdn.com/entries/icons/original/000/026/152/gigachadd.jpg',
        bio: 'Average enjoyer',
        theme: '',
      },
    },
  ];
   */
  users: any = [];
  tags:any = [];


  constructor(private followService: FollowService,
              private profileService: ProfileService,
              ) {
  }
  ngOnInit(): void {

  }

  //need to grab the tags of the logged in user
  userTags()
  {
    const payload: GetProfileInterests={
      user_id: "place",
      profile_id: "place",
      tag_name: ""
    }


  }



  //make a payload

  //need to pass the tags into the get follow back end method



}
