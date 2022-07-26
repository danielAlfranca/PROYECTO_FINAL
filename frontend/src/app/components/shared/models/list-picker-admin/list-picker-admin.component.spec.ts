import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPickerAdminComponent } from './list-picker-admin.component';

describe('ListPickerAdminComponent', () => {
  let component: ListPickerAdminComponent;
  let fixture: ComponentFixture<ListPickerAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPickerAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPickerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
