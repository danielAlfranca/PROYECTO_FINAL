import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReservaActivityComponent } from './new-reserva-activity.component';

describe('NewReservaActivityComponent', () => {
  let component: NewReservaActivityComponent;
  let fixture: ComponentFixture<NewReservaActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewReservaActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewReservaActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
