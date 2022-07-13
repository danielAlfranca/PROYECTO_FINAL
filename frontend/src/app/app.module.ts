import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { MenuComponent } from './components/layout/menu/menu.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { CanvasComponent } from './components/layout/canvas/canvas.component';
import { AsideComponent } from './components/layout/canvas/aside/aside.component';
import { ModalComponent } from './components/layout/canvas/modal/modal.component';
import { CarouselRouterComponent } from './components/layout/canvas/carousel-router/carousel-router.component';
import { HeaderCanvasComponent } from './components/layout/canvas/header-canvas/header-canvas.component';
import { SectionComponent } from './components/shared/section/section.component';
import { TableComponent } from './components/shared/table/table.component';
import { TabsComponent } from './components/shared/tabs/tabs.component';
import { SearchComponent } from './components/shared/table/search/search.component';
import { PaginatorComponent } from './components/shared/table/paginator/paginator.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MenuComponent,
    HeaderComponent,
    CanvasComponent,
    AsideComponent,
    ModalComponent,
    CarouselRouterComponent,
    HeaderCanvasComponent,
    SectionComponent,
    TableComponent,
    TabsComponent,
    SearchComponent,
    PaginatorComponent,
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
    SelectDataDatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }