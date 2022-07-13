import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselRouterComponent } from './carousel-router.component';

describe('CarouselRouterComponent', () => {
  let component: CarouselRouterComponent;
  let fixture: ComponentFixture<CarouselRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselRouterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
