import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PostRes } from 'src/app/models/post/post';
import { PostService } from 'src/app/services/post/post.service';
import { SearchService } from 'src/app/services/search/search.service';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit{

  posts!: PostRes[];

  searchTerms!: string[];

  constructor( private searchService: SearchService, private postService: PostService, ) {}



  ngOnInit(): void {
     // Retrieve the search terms from the service in the OnInit hook
     this.searchTerms = this.searchService.getSearchTerms();
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
    } while (this.posts.length > 20);

    //  // Call the post service
    //  this.postService.getPostsByTag(this.searchTerms, pageNum).subscribe({
    //   next: (value ) => {
    //     //console.log("value from search " + value[0].id);
       
    //     this.posts = value;
    //     const posts1 = value;
    //     //console.log("value from search " + this.posts[0].username);
    //     console.log("num of results is " + this.posts.length);
        
    //   },
    //   error: (error) => {
    //       console.log(error.message);
    //   },
    // });
     
  }

}
