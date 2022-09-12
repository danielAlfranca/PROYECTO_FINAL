import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourActivityFormComponent } from './tour-activity-form.component';

describe('TourActivityFormComponent', () => {
  let component: TourActivityFormComponent;
  let fixture: ComponentFixture<TourActivityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourActivityFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourActivityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
