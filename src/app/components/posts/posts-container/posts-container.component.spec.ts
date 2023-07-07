import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsContainerComponent } from './posts-container.component';

describe('PostsComponent', () => {
  let component: PostsContainerComponent;
  let fixture: ComponentFixture<PostsContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostsContainerComponent],
    });
    fixture = TestBed.createComponent(PostsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
