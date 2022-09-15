import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidasDisplayComponent } from './salidas-display.component';

describe('SalidasDisplayComponent', () => {
  let component: SalidasDisplayComponent;
  let fixture: ComponentFixture<SalidasDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalidasDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalidasDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
