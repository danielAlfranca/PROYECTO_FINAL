import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCustomDateComponent } from './select-custom-date.component';

describe('SelectCustomDateComponent', () => {
  let component: SelectCustomDateComponent;
  let fixture: ComponentFixture<SelectCustomDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCustomDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCustomDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
