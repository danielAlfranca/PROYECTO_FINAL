import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataConfigFormComponent } from './data-config-form.component';

describe('DataConfigFormComponent', () => {
  let component: DataConfigFormComponent;
  let fixture: ComponentFixture<DataConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataConfigFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
