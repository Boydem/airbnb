import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'filter-datepicker',
  templateUrl: './filter-datepicker.component.html',
  styleUrls: ['./filter-datepicker.component.scss'],
})
export class FilterDatepickerComponent implements OnInit {
  faX = faX;
  @Input() activeModule!: string | null;
  @Output() changeModule = new EventEmitter<string>();
  onChangeModule(module: string) {
    this.changeModule.emit(module);
  }

  // range picker logics
  @Input() startDate!: Date | null;
  @Input() endDate!: Date | null;

  selectedStartDate!: Date | null;
  selectedEndDate!: Date | null;

  startMonth: number;
  startYear: number;
  endMonth: number;
  endYear: number;
  startMonthDays!: number[];
  endMonthDays!: number[];

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
    this.startMonth = this.currentDate.getMonth();
    this.startYear = this.currentDate.getFullYear();
    this.endMonth = this.currentDate.getMonth() + 1;
    this.endYear = this.currentDate.getFullYear();
    this.calculateStartMonth();
    this.calculateEndMonth();
  }

  ngOnInit(): void {
    this.selectedStartDate = this.startDate || null;
    this.selectedEndDate = this.endDate || null;
  }

  hoverDate(day: number, month: number, year: number) {
    if (!this.selectedStartDate || this.selectedEndDate) return;
    console.log('hover:');
    const currentDate = new Date();
    const selectedDate = new Date(year, month, day);

    if (
      selectedDate >= currentDate &&
      this.selectedStartDate &&
      selectedDate > this.selectedStartDate
    ) {
      this.startMonthDays.forEach((_, index) => {
        const startDate = new Date(year, month, index + 1);
        if (
          this.selectedStartDate &&
          startDate > this.selectedStartDate &&
          startDate <= selectedDate
        ) {
          const dayEl = document.getElementById(`start-day-${index}`);
          if (dayEl) {
            dayEl.classList.add('in-range');
          }
        }
      });

      this.endMonthDays.forEach((_, index) => {
        const endDate = new Date(year, month, index + 1);
        if (
          this.selectedStartDate &&
          endDate > this.selectedStartDate &&
          endDate <= selectedDate
        ) {
          const dayEl = document.getElementById(`end-day-${index}`);
          if (dayEl) {
            dayEl.classList.add('in-range');
          }
        }
      });
    }
  }

  unHoverDate() {
    if (this.selectedEndDate || !this.selectedStartDate) return;
    console.log('unhover:');
    const inRangeElements = document.querySelectorAll('.in-range');
    inRangeElements.forEach((element) => {
      element.classList.remove('in-range');
    });
  }

  handleChange() {}

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
    if (this.isDisabled(day, month, year)) return;
    const date = new Date(year, month, day);
    if (
      this.activeModule === 'start-date' &&
      this.selectedEndDate &&
      date < this.selectedEndDate
    ) {
      this.onChangeModule('end-date');
      this.selectedStartDate = date;
    } else if (this.activeModule === 'start-date') {
      this.onChangeModule('end-date');
      this.selectedStartDate = date;
      this.selectedEndDate = null;
    } else if (this.activeModule === 'end-date' && !this.selectedStartDate) {
      this.onChangeModule('start-date');
      this.selectedEndDate = date;
    } else if (this.selectedStartDate && date < this.selectedStartDate) {
      this.selectedStartDate = date;
    } else {
      this.selectedEndDate = date;
      this.updateDateRange(); // <-- call updateDateRange() here
    }

    // Add or remove hover classes depending on selected dates
    if (this.selectedStartDate && !this.selectedEndDate) {
      this.hoverDate(day, month, year);
    } else {
      this.unHoverDate();
    }
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
      this.selectedStartDate?.getDate()
    );
    const endDate = new Date(
      endYear,
      endMonth,
      this.selectedEndDate?.getDate()
    );

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
    const startDate = this.selectedStartDate?.getTime();
    const endDate = this.selectedEndDate?.getTime();
    const currentDate = date.getTime();
    if (!startDate || !endDate) return false;
    return currentDate >= startDate && currentDate <= endDate;
  }

  isDayInRange(day: number, month: number, year: number): boolean {
    const date = new Date(year, month, day).getTime();
    const startDate = this.selectedStartDate?.getTime();
    const endDate = this.selectedEndDate?.getTime();
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  }

  isDayActive(day: number, month: number, year: number) {
    const date = new Date(year, month, day).setHours(0, 0, 0, 0);
    const startDate = this.selectedStartDate?.setHours(0, 0, 0, 0);
    const endDate = this.selectedEndDate?.setHours(0, 0, 0, 0);

    return date === startDate || date === endDate;
  }

  isDisabled(day: number, month: number, year: number): boolean {
    const today = new Date();
    const selectedDate = new Date(year, month, day);
    return selectedDate < today;
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
      this.startMonthDays.push(i);
    }
  }

  calculateEndMonth() {
    this.endMonthDays = [];
    const daysInMonth = new Date(this.endYear, this.endMonth + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      this.endMonthDays.push(i);
    }
  }
}
