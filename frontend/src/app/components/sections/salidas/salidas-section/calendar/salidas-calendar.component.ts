import { Component, OnInit } from '@angular/core';
import { CalendarAdminComponent } from 'src/app/components/shared/models/calendar-admin/calendar-admin.component';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-salidas-calendar',
  templateUrl: './salidas-calendar.component.html',
  styleUrls: ['./salidas-calendar.component.scss']
})
export class SalidasCalendarComponent extends CalendarAdminComponent implements OnInit {

  override urlDisplay = 'display-salida';
  override urlForm = 'form-salida';

  constructor(protected override appConfig: AppConfigService) { super(appConfig) }

  ngOnInit(): void { this.init(); }

  override createSections(){

    return Object.values(this.getData('salida') || {}).map((salida:any)=>{

      return  {

        id:this.parseProp(salida,'id','salida'),
        start:this.parseDate(this.parseProp(salida,'date_start','salida'),this.parseProp(salida,'time_start','salida')),
        end:this.parseDate(this.parseProp(salida,'date_end','salida'),this.parseProp(salida,'time_end','salida')),
        title:this.getTitleEvent(salida),
        meta:{item:salida}
      }

    });
  }

  getTitleEvent(salida:any){

    const name = this.parseProp(salida,'tour_name','salida'),
          pax = this.parseProp(salida,'passengers_total_list','salida'),
          start = this.parseProp(salida,'time_start','salida'),
          end = this.parseProp(salida,'time_end','salida'),
          iconpax = '<i class="bi bi-people mx-2"></i>',
          iconTime = '<i class="bi bi-clock mx-2"></i>';

    return name + "<small class='text-light'>"+  iconpax + pax + iconTime + start +" - "+end + "</small>";

  }



}
