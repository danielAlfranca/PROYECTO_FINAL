import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaServicesTableComponent } from './reserva-services-table.component';

describe('ReservaServicesTableComponent', () => {
  let component: ReservaServicesTableComponent;
  let fixture: ComponentFixture<ReservaServicesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservaServicesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaServicesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
