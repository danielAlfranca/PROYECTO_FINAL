import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOperadorComponent } from './display-operador.component';

describe('DisplayOperadorComponent', () => {
  let component: DisplayOperadorComponent;
  let fixture: ComponentFixture<DisplayOperadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayOperadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayOperadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
