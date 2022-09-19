import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiadoFormComponent } from './guiado-form.component';

describe('GuiadoFormComponent', () => {
  let component: GuiadoFormComponent;
  let fixture: ComponentFixture<GuiadoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuiadoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuiadoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
