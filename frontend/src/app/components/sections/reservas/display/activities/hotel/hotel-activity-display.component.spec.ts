import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelActivityDisplayComponent } from './hotel-activity-display.component';

describe('HotelActivityDisplayComponent', () => {
  let component: HotelActivityDisplayComponent;
  let fixture: ComponentFixture<HotelActivityDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelActivityDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelActivityDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
