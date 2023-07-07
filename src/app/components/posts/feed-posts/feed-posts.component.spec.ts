import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedPostsComponent } from './feed-posts.component';

describe('FeedPostsComponent', () => {
  let component: FeedPostsComponent;
  let fixture: ComponentFixture<FeedPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedPostsComponent]
    });
    fixture = TestBed.createComponent(FeedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
