import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsByUserComponent } from './posts-by-user.component';

describe('PostsByUserComponent', () => {
  let component: PostsByUserComponent;
  let fixture: ComponentFixture<PostsByUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostsByUserComponent]
    });
    fixture = TestBed.createComponent(PostsByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
