import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidasCalendarComponent } from './salidas-calendar.component';

describe('SalidasCalendarComponent', () => {
  let component: SalidasCalendarComponent;
  let fixture: ComponentFixture<SalidasCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalidasCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalidasCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
