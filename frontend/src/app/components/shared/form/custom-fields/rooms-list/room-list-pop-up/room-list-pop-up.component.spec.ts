import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomListPopUpComponent } from './room-list-pop-up.component';

describe('RoomListPopUpComponent', () => {
  let component: RoomListPopUpComponent;
  let fixture: ComponentFixture<RoomListPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomListPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomListPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
