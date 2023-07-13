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

    this.getPostsByTagName(this.searchTerms);

   
  }

 async getPostsByUsername(searchTerms:string[])
  {
      const promise = await this.getPostsByTagName(searchTerms);

      if(promise === "empty")
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
      }


  }

getPostsByTagName(searchTerms:string[])
  {

      
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
   } while (this.posts.length > 20);
      
   let array = this.posts;

    return new Promise((resolve, reject) => {

          if(array.length == 0)
          {
              resolve("Empty");
          }
          else 
          {
             reject("Not Empty");
          }
        

    })
          
   
  }

 
  

}


