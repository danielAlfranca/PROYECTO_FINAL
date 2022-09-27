import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { AppConfigService } from 'src/app/services/app-config.service';
import { Subject } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/Es';

import {
  isSameDay,
  isSameMonth,
} from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input() events!: CalendarEvent[];

  @Output() newQuery = new EventEmitter<any>();
  @Output() changeToTable = new EventEmitter<any>();

  CalendarView = CalendarView;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();

 locale: string = "Es";

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="bi bi-pencil"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        //this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="bi bi-times"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
       // this.handleEvent('Deleted', event);
      },
    },
  ]; 

  refresh = new Subject<void>();



  activeDayIsOpen: boolean = true;
  constructor(private appConfig:AppConfigService) { }

  ngOnInit(): void {
    registerLocaleData(localeEs); 
    this.events||= this.events;
  }


 

  query(event?: CalendarEvent): void {
    
    this.newQuery.emit(event?.meta?.item);    
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  
}
