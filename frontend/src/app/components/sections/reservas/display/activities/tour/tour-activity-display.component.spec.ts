import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourActivityDisplayComponent } from './tour-activity-display.component';

describe('TourActivityDisplayComponent', () => {
  let component: TourActivityDisplayComponent;
  let fixture: ComponentFixture<TourActivityDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourActivityDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourActivityDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
