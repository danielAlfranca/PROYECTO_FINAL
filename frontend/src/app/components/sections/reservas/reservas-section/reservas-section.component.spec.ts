import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasSectionComponent } from './reservas-section.component';

describe('ReservasSectionComponent', () => {
  let component: ReservasSectionComponent;
  let fixture: ComponentFixture<ReservasSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservasSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservasSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
