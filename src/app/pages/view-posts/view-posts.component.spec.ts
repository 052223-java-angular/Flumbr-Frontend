import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPostsComponent } from './view-posts.component';

describe('ViewPostsComponent', () => {
  let component: ViewPostsComponent;
  let fixture: ComponentFixture<ViewPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPostsComponent]
    });
    fixture = TestBed.createComponent(ViewPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
