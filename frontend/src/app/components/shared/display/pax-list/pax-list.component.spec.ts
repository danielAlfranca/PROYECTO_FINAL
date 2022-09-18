import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaxListComponent } from './pax-list.component';

describe('PaxListComponent', () => {
  let component: PaxListComponent;
  let fixture: ComponentFixture<PaxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaxListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
