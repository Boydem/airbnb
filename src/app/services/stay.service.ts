import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { Stay } from '../models/stay';

import STAY_DB from '../data/minified-stays.json';
@Injectable({
  providedIn: 'root',
})
export class StayService {
  constructor() {}

  private _stays$ = new BehaviorSubject<Stay[]>([]);
  public stays$ = this._stays$.asObservable();

  public loadStays(): void {
    this._stays$.next(STAY_DB);
  }
}
