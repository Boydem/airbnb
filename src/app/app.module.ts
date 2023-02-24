import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app-root/app.component';

import { HomeComponent } from './pages/home/home.component';
import { StayDetailsComponent } from './pages/stay-details/stay-details.component';
import { StayListComponent } from './pages/home/cmps/stay-list/stay-list.component';
import { StayPreviewComponent } from './pages/home/cmps/stay-preview/stay-preview.component';
import { ImgCarouselComponent } from './pages/home/cmps/img-carousel/img-carousel.component';
import { StayListMapComponent } from './pages/home/cmps/stay-list-map/stay-list-map.component';
import { FiltersBarComponent } from './pages/home/cmps/filters-bar/filters-bar.component';
import { StayService } from './services/stay.service';

import { AppFooterComponent } from './app-cmps/app-footer/app-footer.component';
import { AppLogoComponent } from './app-cmps/app-logo/app-logo.component';
import { OverlayScreenComponent } from './app-cmps/overlay-screen/overlay-screen.component';
import { AppHeaderComponent } from './app-cmps/app-header/app-header.component';
import { FilterLocationComponent } from './app-cmps/app-header/cmps/filter-location/filter-location.component';
import { FilterGuestsComponent } from './app-cmps/app-header/cmps/filter-guests/filter-guests.component';
import { FilterDatepickerComponent } from './app-cmps/app-header/cmps/filter-datepicker/filter-datepicker.component';
import { SearchTeaserComponent } from './app-cmps/app-header/cmps/search-teaser/search-teaser.component';
import { SearchExpandedComponent } from './app-cmps/app-header/cmps/search-expanded/search-expanded.component';
import { UserMenuComponent } from './app-cmps/app-header/cmps/user-menu/user-menu.component';

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
    AppFooterComponent,
    FiltersBarComponent,
    FilterLocationComponent,
    FilterGuestsComponent,
    FilterDatepickerComponent,
    AppLogoComponent,
    SearchTeaserComponent,
    UserMenuComponent,
    SearchExpandedComponent,
    OverlayScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
  ],
  providers: [StayService],
  bootstrap: [AppComponent],
})
export class AppModule {}
