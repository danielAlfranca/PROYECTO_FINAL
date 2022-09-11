import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelActivityFormComponent } from './hotel-activity-form.component';

describe('HotelActivityFormComponent', () => {
  let component: HotelActivityFormComponent;
  let fixture: ComponentFixture<HotelActivityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelActivityFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelActivityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
