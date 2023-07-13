import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkedPostsComponent } from './bookmarked-posts.component';

describe('BookmarkedPostsComponent', () => {
  let component: BookmarkedPostsComponent;
  let fixture: ComponentFixture<BookmarkedPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookmarkedPostsComponent]
    });
    fixture = TestBed.createComponent(BookmarkedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
