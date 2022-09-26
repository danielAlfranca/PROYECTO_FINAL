import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasCalendarComponent } from './reservas-calendar.component';

describe('ReservasCalendarComponent', () => {
  let component: ReservasCalendarComponent;
  let fixture: ComponentFixture<ReservasCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservasCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservasCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
