import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDataDatesComponent } from './select-data-dates.component';

describe('SelectDataDatesComponent', () => {
  let component: SelectDataDatesComponent;
  let fixture: ComponentFixture<SelectDataDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectDataDatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectDataDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
