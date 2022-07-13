import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCanvasComponent } from './header-canvas.component';

describe('HeaderCanvasComponent', () => {
  let component: HeaderCanvasComponent;
  let fixture: ComponentFixture<HeaderCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderCanvasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
