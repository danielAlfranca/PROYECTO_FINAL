import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPassengerComponent } from './display-passenger.component';

describe('DisplayPassengerComponent', () => {
  let component: DisplayPassengerComponent;
  let fixture: ComponentFixture<DisplayPassengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayPassengerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
