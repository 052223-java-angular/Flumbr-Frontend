import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../create-post/create-post.component';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PostService } from 'src/app/services/post/post.service';
import { MessageService } from 'primeng/api';
import { AppSettings } from 'src/app/global/app-settings';
import { Router , NavigationExtras} from '@angular/router';
import { PostRes } from 'src/app/models/post/post';
import {SearchService} from  'src/app/services/search/search.service';


@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css'],
})
export class ViewPostsComponent implements OnInit {

  searchForm!: FormGroup;
  public posts!: Array<PostRes>;
  isLoading = true;

  constructor(
    private dialog: MatDialog,  
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router,
    private messageService: MessageService,
    private searchService: SearchService ) {}

    ngOnInit() {
      this.searchForm = this.formBuilder.group({
        searchtext: ['', Validators.required],
      });
    }

    get searchtext() {
      return this.searchForm.get('searchtext');
    }
  
    search() {
      const searchText = this.searchForm.value.searchtext;
      console.log("search text " + searchText);
      console.log("search Text len " + searchText.length );
      
      if ( !searchText || searchText.trim().length === 0 ){
          alert("Enter a valid search text seperated by commas");
          console.log("empty search string");
      } else {
        const tagArray = searchText.split(",");
        console.log("Array of tags is " + tagArray); // Output: ["blank", "test"]
        this.searchService.setSearchTerms(tagArray);
        this.router.navigate(['/search']);
      }
    } 
  
    

  openPostDialog(): void {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      width: '600px',
      maxHeight: '800px',
    });

    dialogRef.afterClosed().subscribe(() => {});
  }


}
