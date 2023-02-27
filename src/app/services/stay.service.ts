import { Injectable } from '@angular/core';
import {
  lastValueFrom,
  Observable,
  BehaviorSubject,
  of,
  map,
  delay,
  throwError,
} from 'rxjs';
import { Stay, StayPreview } from '../models/stay';

import { Filter, FilterBy } from '../models/filter';
import { Review } from '../models/review';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StayService {
  private _displayedCount = 20;

  constructor(private http: HttpClient) {}

  private _stays$ = new BehaviorSubject<Stay[]>([]);
  public stays$ = this._stays$.asObservable();

  private _filters$ = new BehaviorSubject<Filter[]>([]);
  public filters$ = this._filters$.asObservable();

  private _filterBy$ = new BehaviorSubject<FilterBy>(this.getEmptyFilterBy());
  public filterBy$ = this._filterBy$.asObservable();

  public loadStays() {
    this.http
      .get<Stay[]>('../../assets/data/minified-stays.json')
      .subscribe((stays) => {
        this._stays$.next(stays);
      });
  }

  public loadMoreStays(pageIndex: number): Observable<StayPreview[]> {
    return this.getStayPreviews(pageIndex);
  }

  public getStayPreviews(pageIndex: number = 0): Observable<StayPreview[]> {
    return this._stays$.pipe(
      map((stays) => {
        const filteredStays = this._filter(stays);
        const newStays = filteredStays.slice(
          pageIndex * this._displayedCount,
          (pageIndex + 1) * this._displayedCount
        );
        return newStays.map((stay) => this._arrangePreviewData(stay));
      }),
      delay(2000)
    );
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
    this.http
      .get<Filter[]>('../../assets/data/filters.json')
      .subscribe((filters) => {
        this._filters$.next(filters);
      });
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

  private _arrangePreviewData(stay: Stay): StayPreview {
    return {
      name: stay.name,
      price: stay.price,
      imgUrls: stay.imgUrls,
      isSuperHost: stay.host.isSuperHost,
      loc: stay.loc,
      avgRate: this._calcAvgRate(stay.reviews),
      type: stay.type,
    };
  }
}
