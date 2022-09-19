import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadorFormComponent } from './operador-form.component';

describe('OperadorFormComponent', () => {
  let component: OperadorFormComponent;
  let fixture: ComponentFixture<OperadorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperadorFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperadorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
