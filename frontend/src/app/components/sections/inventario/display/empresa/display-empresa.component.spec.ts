import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayEmpresaComponent } from './display-empresa.component';

describe('DisplayEmpresaComponent', () => {
  let component: DisplayEmpresaComponent;
  let fixture: ComponentFixture<DisplayEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
