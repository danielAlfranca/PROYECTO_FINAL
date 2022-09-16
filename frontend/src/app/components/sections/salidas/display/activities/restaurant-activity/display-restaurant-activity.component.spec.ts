import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayRestaurantActivityComponent } from './display-restaurant-activity.component';

describe('DisplayRestaurantActivityComponent', () => {
  let component: DisplayRestaurantActivityComponent;
  let fixture: ComponentFixture<DisplayRestaurantActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayRestaurantActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayRestaurantActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
