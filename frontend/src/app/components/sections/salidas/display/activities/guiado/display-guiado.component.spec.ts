import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayGuiadoComponent } from './display-guiado.component';

describe('DisplayGuiadoComponent', () => {
  let component: DisplayGuiadoComponent;
  let fixture: ComponentFixture<DisplayGuiadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayGuiadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayGuiadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
