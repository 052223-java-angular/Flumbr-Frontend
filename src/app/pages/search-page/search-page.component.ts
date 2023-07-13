import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PostRes } from 'src/app/models/post/post';
import { PostService } from 'src/app/services/post/post.service';
import { SearchService } from 'src/app/services/search/search.service';
import { TokenService } from 'src/app/services/tokenservice.service';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit{

  posts: PostRes[] = [];

  searchTerms!: string[];

  constructor( private searchService: SearchService, private postService: PostService, ) {}



  ngOnInit(): void {
     // Retrieve the search terms from the service in the OnInit hook
     this.searchTerms = this.searchService.getSearchTerms();

     for (let search of this.searchTerms)
     {
        console.log("Search:" + search);
     }

      /* if(this.searchTerms.length === 1 && this.posts.length === 0)
     {
        this.postService.getPostsByUsername(this.searchTerms[0]).subscribe({
            next:  (post) => {
                this.posts = post;
            },
            error: (err) => {
              console.log(err.message);
            }
        })
     }

     // Use the search terms as needed
     console.log("SearchStrings " + this.searchTerms);
     let pageNum = 1; // Grabs the first 20 posts

     do {
      this.postService.getPostsByTag(this.searchTerms, pageNum).subscribe({
        next: (value) => {
          this.posts = value;
          const posts1 = value;
          console.log("Number of results is " + this.posts.length);
        },
        error: (error) => {
          console.log(error.message);
        },
      });
      
      pageNum++;
    } while (this.posts.length > 20);*/

    this.getPostsByTagName(this.searchTerms, 1);

   
  }

 getPostsByUsername(searchTerms:string[])
  {
      
          this.postService.getPostsByUsername(searchTerms[0]).subscribe({
            next: (res) => {
               this.posts = res;

            },
            error: (err) => {
              console.log(err.message);
            }
          })

          let length = this.posts.length;
    
      return new Promise((resolve, reject) => {
          if(length !== 0)
          {
              resolve(null)
          }
          else{
            reject(this.posts);
          }

      });

  }

  async getPostsByTagName(searchTerms:string[], pageNum:number)
  {

    let response:any = await this.getPostsByUsername(searchTerms);

   

      if(response !== null)
      {
          this.postService.getPostsByTag(this.searchTerms, pageNum).subscribe({
            next: (value) => {
              this.posts = value;
              const posts1 = value;
              console.log("Number of results is " + this.posts.length);
            },
            error: (error) => {
              console.log(error.message);
            },
          });   
      }
   
    
   
  }

 
  

}


