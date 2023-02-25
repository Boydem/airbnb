import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { Stay } from '../models/stay';

import STAY_DB from '../data/minified-stays.json';
import FILTERS_DB from '../data/filters.json';
import { Filter, FilterBy } from '../models/filter';
@Injectable({
  providedIn: 'root',
})
export class StayService {
  constructor() {}

  private _stays$ = new BehaviorSubject<Stay[]>([]);
  public stays$ = this._stays$.asObservable();

  private _filters$ = new BehaviorSubject<Filter[]>([]);
  public filters$ = this._filters$.asObservable();

  private _filterBy$ = new BehaviorSubject<FilterBy>(this.getEmptyFilterBy());
  public filterBy$ = this._filterBy$.asObservable();

  public loadStays(): void {
    this._stays$.next(STAY_DB);
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
    };
  }
}
