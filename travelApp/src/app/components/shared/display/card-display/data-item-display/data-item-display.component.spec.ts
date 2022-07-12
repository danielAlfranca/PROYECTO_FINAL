import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataItemDisplayComponent } from './data-item-display.component';

describe('DataItemDisplayComponent', () => {
  let component: DataItemDisplayComponent;
  let fixture: ComponentFixture<DataItemDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataItemDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataItemDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
