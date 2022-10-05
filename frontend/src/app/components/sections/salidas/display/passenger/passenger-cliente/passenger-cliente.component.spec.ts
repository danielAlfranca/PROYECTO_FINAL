import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerClienteComponent } from './passenger-cliente.component';

describe('PassengerClienteComponent', () => {
  let component: PassengerClienteComponent;
  let fixture: ComponentFixture<PassengerClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
