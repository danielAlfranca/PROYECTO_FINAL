import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoferFormComponent } from './chofer-form.component';

describe('ChoferFormComponent', () => {
  let component: ChoferFormComponent;
  let fixture: ComponentFixture<ChoferFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoferFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
