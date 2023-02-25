import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'filter-datepicker',
  templateUrl: './filter-datepicker.component.html',
  styleUrls: ['./filter-datepicker.component.scss'],
})
export class FilterDatepickerComponent {
  faX = faX;
  @Input() activeModule!: string | null;
  @Output() changeModule = new EventEmitter<string>();
  onChangeModule(module: string) {
    this.changeModule.emit(module);
  }

  // range picker logics
  startDate: Date | null = null;
  endDate: Date | null = null;
  startMonth: number;
  startYear: number;
  endMonth: number;
  endYear: number;
  startMonthDays!: { day: number; className: string }[];
  endMonthDays!: { day: number; className: string }[];
  selectedFirstDate: Date;
  selectedStartDate: Date;
  selectedEndDate: Date;
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  days: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  currentDate = new Date();

  constructor() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.selectedStartDate = new Date();
    this.selectedEndDate = new Date();
    this.selectedFirstDate = new Date();
    this.startMonth = this.currentDate.getMonth();
    this.startYear = this.currentDate.getFullYear();
    this.endMonth = this.currentDate.getMonth() + 1;
    this.endYear = this.currentDate.getFullYear();
    this.calculateStartMonth();
    this.calculateEndMonth();
  }

  previousMonth(start: boolean) {
    if (start) {
      this.startMonth--;
    } else {
      this.endMonth--;
      if (
        this.startMonth === this.endMonth &&
        this.startYear === this.endYear
      ) {
        this.startMonth--;
      }
    }
    if (this.startMonth < 0) {
      this.startMonth = 11;
      this.startYear--;
    }
    if (this.endMonth < 0) {
      this.endMonth = 11;
      this.endYear--;
    }
    if (this.startMonth === this.endMonth && this.startYear === this.endYear) {
      this.startMonth--;
    }
    this.calculateStartMonth();
    this.calculateEndMonth();
  }

  nextMonth(start: boolean) {
    if (start) {
      this.startMonth++;
      if (
        this.startMonth === this.endMonth &&
        this.startYear === this.endYear
      ) {
        this.endMonth++;
      }
      if (this.startMonth > 11) {
        this.startMonth = 0;
        this.startYear++;
      }
      if (this.endMonth > 11) {
        this.endMonth = 0;
        this.endYear++;
      }
      if (
        this.startMonth === this.endMonth &&
        this.startYear === this.endYear
      ) {
        this.endMonth++;
      }
      this.calculateStartMonth();
      this.calculateEndMonth();
    }
  }

  selectDate(day: number, month: number, year: number) {
    if (this.activeModule === 'start-date') {
      this.selectFirstDate(day, month, year);
    } else if (this.activeModule === 'end-date') {
      this.selectSecondDate(day, month, year);
    }
  }

  selectFirstDate(day: number, month: number, year: number) {
    const date = new Date(year, month, day);

    if (this.selectedEndDate && date > this.selectedEndDate) {
      // If the user selects a start date that is after the current end date,
      // update the end date to be the same as the start date.
      this.selectedEndDate = date;
    } else {
      this.selectedFirstDate = date; // <-- reset selectedFirstDate to new date
      this.selectedStartDate = date;
    }

    this.updateDateRange();
  }

  selectSecondDate(day: number, month: number, year: number) {
    const date = new Date(year, month, day);

    if (this.selectedFirstDate && date < this.selectedFirstDate) {
      // If the user selects an end date that is before the current start date,
      // update the start date to be the same as the end date.
      this.selectedFirstDate = date;
      this.selectedStartDate = date;
    }

    this.selectedEndDate = date;
    this.updateDateRange(); // <-- call updateDateRange() here
  }

  updateDateRange() {
    if (this.selectedStartDate && this.selectedEndDate) {
      this.startDate = this.selectedStartDate;
      this.endDate = this.selectedEndDate;
    }
  }

  isInRange(
    startMonth: number,
    startYear: number,
    endMonth: number,
    endYear: number
  ): boolean {
    const startDate = new Date(
      startYear,
      startMonth,
      this.selectedStartDate.getDate()
    );
    const endDate = new Date(endYear, endMonth, this.selectedEndDate.getDate());

    for (
      let day = startDate.getTime();
      day <= endDate.getTime();
      day += 86400000
    ) {
      if (this.isDateInRange(new Date(day))) {
        return true;
      }
    }

    return false;
  }

  isDateInRange(date: Date): boolean {
    const startDate = this.selectedStartDate.getTime();
    const endDate = this.selectedEndDate.getTime();
    const currentDate = date.getTime();
    return currentDate >= startDate && currentDate <= endDate;
  }

  isDayInRange(day: number, month: number, year: number): boolean {
    const date = new Date(year, month, day).getTime();
    const startDate = this.selectedStartDate.getTime();
    const endDate = this.selectedEndDate.getTime();
    return date >= startDate && date <= endDate;
  }

  isDayActive(day: number, month: number, year: number) {
    const date = new Date(year, month, day).setHours(0, 0, 0, 0);
    const startDate = this.selectedStartDate.setHours(0, 0, 0, 0);
    const endDate = this.selectedEndDate.setHours(0, 0, 0, 0);

    return date === startDate || date === endDate;
  }

  calculateStartMonth() {
    this.startMonthDays = [];

    const daysInMonth = new Date(
      this.startYear,
      this.startMonth + 1,
      0
    ).getDate();

    // Add the days from the current month
    for (let i = 1; i <= daysInMonth; i++) {
      this.startMonthDays.push({ day: i, className: '' });
    }
  }

  calculateEndMonth() {
    this.endMonthDays = [];
    const daysInMonth = new Date(this.endYear, this.endMonth + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      this.endMonthDays.push({ day: i, className: '' });
    }
  }
}
