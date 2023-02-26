import { Injectable } from '@angular/core';
import {
  lastValueFrom,
  Observable,
  BehaviorSubject,
  of,
  throwError,
} from 'rxjs';
import { Stay, StayPreview } from '../models/stay';

import STAY_DB from '../data/minified-stays.json';
import FILTERS_DB from '../data/filters.json';
import { Filter, FilterBy } from '../models/filter';
import { Review } from '../models/review';
@Injectable({
  providedIn: 'root',
})
export class StayService {
  constructor() {}

  private _stays$ = new BehaviorSubject<StayPreview[]>([]);
  public stays$ = this._stays$.asObservable();

  private _filters$ = new BehaviorSubject<Filter[]>([]);
  public filters$ = this._filters$.asObservable();

  private _filterBy$ = new BehaviorSubject<FilterBy>(this.getEmptyFilterBy());
  public filterBy$ = this._filterBy$.asObservable();

  public loadStays() {
    const filteredStays = this._filter(STAY_DB);
    const staysForPreview = filteredStays.map((stay) => ({
      name: stay.name,
      price: stay.price,
      imgUrls: stay.imgUrls,
      isSuperHost: stay.host.isSuperHost,
      loc: stay.loc,
      avgRate: this._calcAvgRate(stay.reviews),
      type: stay.type,
      // likedByUser:stay.likedByUsers.findIndex(s=>this.userService.getLoggedInUser().id === s),
    }));
    this._stays$.next(staysForPreview);
  }

  public setFilter(filterBy: FilterBy) {
    this._filterBy$.next(filterBy);
    this.loadStays();
  }

  private _filter(stays: Stay[]) {
    let filteredStays = stays;
    let filterBy = this._filterBy$.value;
    if (filterBy.labels.length) {
      filteredStays = stays.filter((stay) =>
        stay.labels.some((label) => filterBy.labels.includes(label))
      );
    }

    return filteredStays;
  }

  private _calcAvgRate(stayReviews: Review[]): string {
    if (!stayReviews.length) return '0';
    let allRatesSum = stayReviews.reduce((acc, review) => {
      const rates = Object.values(review.moreRate);
      let ratesSum = 0;
      rates.forEach((r) => (ratesSum += r));
      acc += ratesSum / rates.length;
      return acc;
    }, 0);
    return (allRatesSum / stayReviews.length).toFixed(2);
  }

  public loadFilters(): void {
    this._filters$.next(FILTERS_DB);
  }

  public getEmptyFilterBy() {
    return {
      destination: '',
      adults: 0,
      children: 0,
      infants: 0,
      pets: 0,
      startDate: null,
      endDate: null,
      labels: [],
      guests: 0,
    };
  }
}
