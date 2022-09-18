import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaxListFormAdminComponent } from './pax-list-form-admin.component';

describe('PaxListFormAdminComponent', () => {
  let component: PaxListFormAdminComponent;
  let fixture: ComponentFixture<PaxListFormAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaxListFormAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaxListFormAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
