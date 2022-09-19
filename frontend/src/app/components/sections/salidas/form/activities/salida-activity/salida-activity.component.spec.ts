import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidaActivityComponent } from './salida-activity.component';

describe('SalidaActivityComponent', () => {
  let component: SalidaActivityComponent;
  let fixture: ComponentFixture<SalidaActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalidaActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalidaActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
