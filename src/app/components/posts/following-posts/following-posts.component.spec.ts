import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingPostsComponent } from './following-posts.component';

describe('FollowingPostsComponent', () => {
  let component: FollowingPostsComponent;
  let fixture: ComponentFixture<FollowingPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FollowingPostsComponent]
    });
    fixture = TestBed.createComponent(FollowingPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
