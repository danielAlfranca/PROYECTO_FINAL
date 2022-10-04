import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasActivityTableComponent } from './reservas-activity-table.component';

describe('ReservasActivityTableComponent', () => {
  let component: ReservasActivityTableComponent;
  let fixture: ComponentFixture<ReservasActivityTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservasActivityTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservasActivityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
