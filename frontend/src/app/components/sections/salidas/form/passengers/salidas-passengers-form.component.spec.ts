import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidasPassengersFormComponent } from './salidas-passengers-form.component';

describe('SalidasPassengersFormComponent', () => {
  let component: SalidasPassengersFormComponent;
  let fixture: ComponentFixture<SalidasPassengersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalidasPassengersFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalidasPassengersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
