import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { MenuComponent } from './components/layout/menu/menu.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { CanvasComponent } from './components/layout/canvas/canvas.component';
import { HeaderCanvasComponent } from './components/layout/canvas/header-canvas/header-canvas.component';
import { SectionComponent } from './components/shared/models/section/section.component';
import { TableComponent } from './components/shared/table/table.component';
import { TabsComponent } from './components/shared/tabs/tabs.component';
import { SearchComponent } from './components/shared/table/search/search.component';
import { DataConfigFormComponent } from './components/shared/forms/data-config-form/data-config-form.component';
import { FormCreatorComponent } from './components/shared/forms/form-creator/form-creator.component';
import { FormInputComponent } from './components/shared/forms/form-input/form-input.component';
import { DateTimePickerComponent } from './components/shared/forms/date-time-picker/date-time-picker.component';
import { ItemPickerComponent } from './components/shared/forms/item-picker/item-picker.component';
import { SelectComponent } from './components/shared/forms/select/select.component';
import { CardDisplayComponent } from './components/shared/display/card-display/card-display.component';
import { CardHeaderComponent } from './components/shared/display/card-display/card-header/card-header.component';
import { DataItemDisplayComponent } from './components/shared/display/card-display/data-item-display/data-item-display.component';
import { FeaturedDataDisplayComponent } from './components/shared/display/card-display/featured-data-display/featured-data-display.component';
import { FooterDisplayComponent } from './components/shared/display/footer-display/footer-display.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ShowPipe } from './pipes/show.pipe';
import { SelectDataDatesComponent } from './components/layout/header/select-data-dates/select-data-dates.component';
import { ReservasSectionComponent } from './components/sections/reservas/reservas-section/reservas-section.component';
import { InventarioSectionComponent } from './components/sections/inventario/section/inventario-section.component';
import { SalidasSectionComponent } from './components/sections/salidas/salidas-section/salidas-section.component';
import { PagosSectionComponent } from './components/sections/pagos/pagos-section/pagos-section.component';
import { TabsHeaderComponent } from './components/shared/tabs/tabs-header/tabs-header.component';
import { PaginatePipe } from './pipes/paginate.pipe';
import { TableHeaderComponent } from './components/shared/table/table-header/table-header.component';
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
import { FormsComponent } from './components/shared/forms/forms.component';
import { FormComponent } from './components/shared/form/form.component';
import { InputComponent } from './components/shared/form/input/input.component';
import { FormAdminComponent } from './components/shared/models/form-admin/form-admin.component';
import { ErrorsPipe } from './pipes/errors.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MenuComponent,
    HeaderComponent,
    CanvasComponent,
    HeaderCanvasComponent,
    SectionComponent,
    TableComponent,
    TabsComponent,
    SearchComponent,
    DataConfigFormComponent,
    FormCreatorComponent,
    FormInputComponent,
    DateTimePickerComponent,
    ItemPickerComponent,
    SelectComponent,
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
    TableHeaderComponent,
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
    FormsComponent,
    FormComponent,
    InputComponent,
    FormAdminComponent,
    ErrorsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
