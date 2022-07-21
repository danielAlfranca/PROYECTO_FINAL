import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayHotelComponent } from './display-hotel.component';

describe('DisplayHotelComponent', () => {
  let component: DisplayHotelComponent;
  let fixture: ComponentFixture<DisplayHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayHotelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
