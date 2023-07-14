import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../create-post/create-post.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostRes } from 'src/app/models/post/post';
import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from 'src/app/services/search/search.service';
import { Router } from '@angular/router';

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
    private router: Router,
    private searchService: SearchService,
    private authService: AuthService
  ) {}

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
    console.log('search text ' + searchText);
    console.log('search Text len ' + searchText.length);

    if (!searchText || searchText.trim().length === 0) {
      console.log('Empty search string');
    } else {
      const tagArray = searchText.split(',');
      console.log('Array of tags is ' + tagArray); // Output: ["blank", "test"]
      if (tagArray.length <= 1) {
        this.authService.getUserByUsername(searchText.trim()).subscribe({
          next: (resp: any) => {
            this.router.navigateByUrl(`/profile/${resp.id}`);
          },
          error: (err) => {
            this.searchService.setSearchTerms(tagArray);
            this.router.navigate(['/search']);
          },
        });
      } else {
        this.searchService.setSearchTerms(tagArray);
        this.router.navigate(['/search']);
      }
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
