import { Component, OnInit } from '@angular/core';
import { format, parse } from 'date-fns';
import { CalendarAdminComponent } from 'src/app/components/shared/models/calendar-admin/calendar-admin.component';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-reservas-calendar',
  templateUrl: './reservas-calendar.component.html',
  styleUrls: ['./reservas-calendar.component.scss']
})
export class ReservasCalendarComponent extends CalendarAdminComponent implements OnInit {

  override urlDisplay = 'display-reserva';
  override urlForm = 'form-reserva';

  constructor(protected override appConfig: AppConfigService) { super(appConfig) }

  ngOnInit(): void { this.init(); }

  override createSections(){

    return Object.values(this.getData('reserva') || {}).map((reserva:any)=>{

      return  {

        id:this.parseProp(reserva,'id','reserva'),
        start:this.parseDate(this.parseProp(reserva,'date_start','reserva')),
        end:this.parseDate(this.parseProp(reserva,'date_end','reserva')),
        title:this.getTitleEvent(reserva),
        meta:{item:reserva}
      }

    });
  }

  getTitleEvent(reserva:any){

    const name = this.parseProp(reserva,'full_name','reserva'),
          pax = this.parseProp(reserva,'passengers_list','reserva'),
          start = this.parseProp(reserva,'date_start','reserva'),
          end = this.parseProp(reserva,'date_end','reserva'),
          iconpax = '<i class="bi bi-people mx-2"></i>',
          iconTime = '<i class="bi bi-clock mx-2"></i>';

    return name + "<small class='text-light'>"+  iconpax + pax + iconTime + format(parse(start, 'yyyy-MM-dd', new Date()),'dd/MM/yy') +" - "+format(parse(end, 'yyyy-MM-dd', new Date()),'dd/MM/yy') + "</small>";

  }
}
