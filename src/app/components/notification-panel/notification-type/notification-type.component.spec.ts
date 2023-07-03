import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationTypeComponent } from './notification-type.component';

describe('NotificationTypeComponent', () => {
  let component: NotificationTypeComponent;
  let fixture: ComponentFixture<NotificationTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationTypeComponent]
    });
    fixture = TestBed.createComponent(NotificationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
