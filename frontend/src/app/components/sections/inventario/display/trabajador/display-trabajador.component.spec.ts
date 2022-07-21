import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTrabajadorComponent } from './display-trabajador.component';

describe('DisplayTrabajadorComponent', () => {
  let component: DisplayTrabajadorComponent;
  let fixture: ComponentFixture<DisplayTrabajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayTrabajadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
