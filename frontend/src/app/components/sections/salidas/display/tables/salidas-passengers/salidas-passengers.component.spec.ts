import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidasPassengersComponent } from './salidas-passengers.component';

describe('SalidasPassengersComponent', () => {
  let component: SalidasPassengersComponent;
  let fixture: ComponentFixture<SalidasPassengersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalidasPassengersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalidasPassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
