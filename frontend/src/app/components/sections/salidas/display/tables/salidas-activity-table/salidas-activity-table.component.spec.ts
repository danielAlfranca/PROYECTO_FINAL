import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidasActivityTableComponent } from './salidas-activity-table.component';

describe('SalidasActivityTableComponent', () => {
  let component: SalidasActivityTableComponent;
  let fixture: ComponentFixture<SalidasActivityTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalidasActivityTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalidasActivityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
