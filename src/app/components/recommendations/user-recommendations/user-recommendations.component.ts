import { Component } from '@angular/core';

@Component({
  selector: 'app-user-recommendations',
  templateUrl: './user-recommendations.component.html',
  styleUrls: ['./user-recommendations.component.scss'],
})
export class UserRecommendationsComponent {
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
}
