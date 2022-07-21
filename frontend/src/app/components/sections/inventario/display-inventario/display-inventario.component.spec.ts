import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInventarioComponent } from './display-inventario.component';

describe('DisplayInventarioComponent', () => {
  let component: DisplayInventarioComponent;
  let fixture: ComponentFixture<DisplayInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
