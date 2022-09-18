import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputModule } from 'ngx-chips'; // PARA INPUT ARRAY

import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { MenuComponent } from './components/layout/menu/menu.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { CanvasComponent } from './components/layout/canvas/canvas.component';
import { HeaderCanvasComponent } from './components/layout/canvas/header-canvas/header-canvas.component';
import { TableComponent } from './components/shared/table/table.component';
import { TabsComponent } from './components/shared/tabs/tabs.component';
import { SearchComponent } from './components/shared/table/search/search.component';
import { CardDisplayComponent } from './components/shared/display/card-display/card-display.component';
import { CardHeaderComponent } from './components/shared/display/card-display/card-header/card-header.component';
import { DataItemDisplayComponent } from './components/shared/display/card-display/data-item-display/data-item-display.component';
import { FeaturedDataDisplayComponent } from './components/shared/display/card-display/featured-data-display/featured-data-display.component';
import { FooterDisplayComponent } from './components/shared/display/footer-display/footer-display.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ShowPipe } from './pipes/show.pipe';
import { SelectDataDatesComponent } from './components/layout/header/select-data-dates/select-data-dates.component';
import { ReservasSectionComponent } from './components/sections/reservas/section/reservas-section.component';
import { InventarioSectionComponent } from './components/sections/inventario/section/inventario-section.component';
import { SalidasSectionComponent } from './components/sections/salidas/salidas-section/salidas-section.component';
import { PagosSectionComponent } from './components/sections/pagos/pagos-section/pagos-section.component';
import { TabsHeaderComponent } from './components/shared/tabs/tabs-header/tabs-header.component';
import { PaginatePipe } from './pipes/paginate.pipe';
import { NewInventarioComponent } from './components/sections/inventario/form/new-inventario.component';
import { DisplayEmpresaComponent } from './components/sections/inventario/display/empresa/display-empresa.component';
import { DisplayTrabajadorComponent } from './components/sections/inventario/display/trabajador/display-trabajador.component';
import { DisplayAdminComponent } from './components/shared/models/display-admin/display-admin.component';
import { DisplayHotelComponent } from './components/sections/inventario/display/hotel/display-hotel.component';
import { DisplayTourComponent } from './components/sections/inventario/display/tour/display-tour.component';
import { EmpresaFormComponent } from './components/sections/inventario/form/empresa/empresa-form.component';
import { TrabajadorFormComponent } from './components/sections/inventario/form/trabajador/trabajador-form.component';
import { TourFormComponent } from './components/sections/inventario/form/tour/tour-form.component';
import { HotelFormComponent } from './components/sections/inventario/form/hotel/hotel-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/shared/form/form.component';
import { InputComponent } from './components/shared/form/input/input.component';
import { FormAdminComponent } from './components/shared/models/form-admin/form-admin.component';
import { ErrorsPipe } from './pipes/errors.pipe';
import { StringArrayComponent } from './components/shared/form/custom-fields/string-array/string-array.component';
import { CustomFieldComponent } from './components/shared/form/custom-fields/model/custom-field.component';
import { TimePickerComponent } from './components/shared/form/custom-fields/date-time-picker/time-picker/time-picker.component';
import { ItemPickerComponent } from './components/shared/form/custom-fields/item-picker/item-picker.component';
import { ItemListComponent } from './components/shared/form/custom-fields/item-picker/list/item-list.component';
import { ItemFormComponent } from './components/shared/form/custom-fields/item-picker/form/item-form.component';
import { TableAdminComponent } from './components/shared/models/table-admin/table-admin.component';

import { DatePipe } from '@angular/common';
import { ReservasDisplayComponent } from './components/sections/reservas/display/reservas-display.component';

import { TourActivityDisplayComponent } from './components/sections/reservas/display/activities/tour/tour-activity-display.component';
import { HotelActivityDisplayComponent } from './components/sections/reservas/display/activities/hotel/hotel-activity-display.component';
import { ReservaFormComponent } from './components/sections/reservas/form/reserva/reserva-form.component';
import { TourActivityFormComponent } from './components/sections/reservas/form/activities/tour/tour-activity-form.component';
import { HotelActivityFormComponent } from './components/sections/reservas/form/activities/hotel/hotel-activity-form.component';
import { StepFormComponent } from './components/shared/form/step-form/step-form.component';
import { DateTimePickerComponent } from './components/shared/form/custom-fields/date-time-picker/date-time-picker.component';
import { DatePickerComponent } from './components/shared/form/custom-fields/date-time-picker/date-picker/date-picker.component';
import { PassengersListComponent } from './components/shared/form/custom-fields/passengers-list/passengers-list.component';
import { ActivitiesListComponent } from './components/shared/display/activities-list/activities-list.component';
import { ActivitiesListFormAdminComponent } from './components/shared/form/custom-fields/form-admin/activities-list-form-admin/activities-list-form-admin.component';
import { NewReservaActivityComponent } from './components/sections/reservas/form/activities/new-activity/new-reserva-activity.component';
import { RoomsListComponent } from './components/shared/form/custom-fields/rooms-list/rooms-list.component';
import { RoomListPopUpComponent } from './components/shared/form/custom-fields/rooms-list/room-list-pop-up/room-list-pop-up.component';
import { RoomPipe } from './pipes/room.pipe';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SalidasCalendarComponent } from './components/sections/salidas/salidas-section/calendar/salidas-calendar.component';
import { SalidasFormComponent } from './components/sections/salidas/form/salidas-form.component';
import { SalidasDisplayComponent } from './components/sections/salidas/display/salidas-display.component';
import { CalendarComponent } from './components/shared/calendar/calendar.component';
import { CalendarAdminComponent } from './components/shared/models/calendar-admin/calendar-admin.component';
import { DisplayGuiadoComponent } from './components/sections/salidas/display/activities/guiado/display-guiado.component';
import { DisplayChoferComponent } from './components/sections/salidas/display/activities/chofer/display-chofer.component';
import { DisplayOperadorComponent } from './components/sections/salidas/display/activities/operador/display-operador.component';
import { DisplayRestaurantActivityComponent } from './components/sections/salidas/display/activities/restaurant-activity/display-restaurant-activity.component';
import { DisplayPassengerComponent } from './components/sections/salidas/display/passenger/display-passenger.component';
import { PaxListComponent } from './components/shared/display/pax-list/pax-list.component';
import { PaxListFormAdminComponent } from './components/shared/form/custom-fields/form-admin/pax-list-form-admin/pax-list-form-admin.component';




@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MenuComponent,
    HeaderComponent,
    CanvasComponent,
    HeaderCanvasComponent,
    TableComponent,
    TabsComponent,
    SearchComponent,
    CardDisplayComponent,
    CardHeaderComponent,
    DataItemDisplayComponent,
    FeaturedDataDisplayComponent,
    FooterDisplayComponent,
    FooterComponent,
    ShowPipe,
    SelectDataDatesComponent,
    ReservasSectionComponent,
    InventarioSectionComponent,
    SalidasSectionComponent,
    PagosSectionComponent,
    TabsHeaderComponent,
    PaginatePipe,
    NewInventarioComponent,
    DisplayEmpresaComponent,
    DisplayTrabajadorComponent,
    DisplayAdminComponent,
    DisplayHotelComponent,
    DisplayTourComponent,
    EmpresaFormComponent,
    TrabajadorFormComponent,
    TourFormComponent,
    HotelFormComponent,
    FormComponent,
    InputComponent,
    FormAdminComponent,
    ErrorsPipe,
    StringArrayComponent,
    CustomFieldComponent,
    TimePickerComponent,
    ItemPickerComponent,
    ItemListComponent,
    ItemFormComponent,
    TableAdminComponent,
    ReservasDisplayComponent,
    TourActivityDisplayComponent,
    HotelActivityDisplayComponent,
    ReservaFormComponent,
    TourActivityFormComponent,
    HotelActivityFormComponent,
    StepFormComponent,
    DateTimePickerComponent,
    DatePickerComponent,
    PassengersListComponent,
    ActivitiesListComponent,
    ActivitiesListFormAdminComponent,
    NewReservaActivityComponent,
    RoomsListComponent,
    RoomListPopUpComponent,
    RoomPipe,
    SalidasCalendarComponent,
    SalidasFormComponent,
    SalidasDisplayComponent,
    CalendarComponent,
    CalendarAdminComponent,
    DisplayGuiadoComponent,
    DisplayChoferComponent,
    DisplayOperadorComponent,
    DisplayRestaurantActivityComponent,
    DisplayPassengerComponent,
    PaxListComponent,
    PaxListFormAdminComponent

  ],
  imports: [
    TagInputModule, 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
   
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
