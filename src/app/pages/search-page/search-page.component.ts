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
     console.log("in sc " + this.searchTerms);

     // Call the post service
     this.postService.getPostsByTag(this.searchTerms, 1).subscribe({
      next: (value ) => {
        //console.log("value from search " + value[0].id);
       
        this.posts = value;
        const posts1 = value;
        console.log("value from search " + this.posts[0].username);
        console.log("num of results is " + this.posts.length);
      },
      error: (error) => {
          
      },
    });
     
  }

}
