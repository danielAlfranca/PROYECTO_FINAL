import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayChoferComponent } from './display-chofer.component';

describe('DisplayChoferComponent', () => {
  let component: DisplayChoferComponent;
  let fixture: ComponentFixture<DisplayChoferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayChoferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayChoferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
