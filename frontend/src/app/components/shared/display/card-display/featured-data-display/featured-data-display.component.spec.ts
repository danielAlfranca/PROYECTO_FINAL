import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedDataDisplayComponent } from './featured-data-display.component';

describe('FeaturedDataDisplayComponent', () => {
  let component: FeaturedDataDisplayComponent;
  let fixture: ComponentFixture<FeaturedDataDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedDataDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedDataDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
