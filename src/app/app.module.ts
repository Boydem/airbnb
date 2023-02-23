import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app-root/app.component';
import { HomeComponent } from './pages/home/home.component';
import { StayDetailsComponent } from './pages/stay-details/stay-details.component';
import { StayListComponent } from './pages/home/cmps/stay-list/stay-list.component';
import { StayPreviewComponent } from './pages/home/cmps/stay-preview/stay-preview.component';
import { ImgCarouselComponent } from './pages/home/cmps/img-carousel/img-carousel.component';
import { StayListMapComponent } from './pages/home/cmps/stay-list-map/stay-list-map.component';
import { AppHeaderComponent } from './app-cmps/app-header/app-header.component';
import { FiltersBarComponent } from './pages/home/cmps/filters-bar/filters-bar.component';
import { FilterLocationComponent } from './app-cmps/filter-location/filter-location.component';
import { FilterGuestsComponent } from './app-cmps/filter-guests/filter-guests.component';
import { FilterDatepickerComponent } from './app-cmps/filter-datepicker/filter-datepicker.component';
import { StayService } from './services/stay.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StayDetailsComponent,
    StayListComponent,
    StayPreviewComponent,
    ImgCarouselComponent,
    StayListMapComponent,
    AppHeaderComponent,
    FiltersBarComponent,
    FilterLocationComponent,
    FilterGuestsComponent,
    FilterDatepickerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [StayService],
  bootstrap: [AppComponent],
})
export class AppModule {}
