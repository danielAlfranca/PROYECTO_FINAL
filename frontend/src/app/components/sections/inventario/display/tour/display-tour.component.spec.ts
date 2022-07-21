import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTourComponent } from './display-tour.component';

describe('DisplayTourComponent', () => {
  let component: DisplayTourComponent;
  let fixture: ComponentFixture<DisplayTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayTourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
