// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { faX } from '@fortawesome/free-solid-svg-icons';

// @Component({
//   selector: 'filter-datepicker',
//   templateUrl: './filter-datepicker.component.html',
//   styleUrls: ['./filter-datepicker.component.scss'],
// })
// export class FilterDatepickerComponent {
//   faX = faX;
//   @Input() activeModule!: string | null;
//   @Output() changeModule = new EventEmitter<string>();
//   onChangeModule(module: string) {
//     this.changeModule.emit(module);
//   }

//   // range picker logics
//   startDate: Date;
//   endDate: Date;
//   showDatePicker = false;
//   startMonth: number;
//   startYear: number;
//   endMonth: number;
//   endYear: number;
//   startMonthDays!: number[];
//   endMonthDays!: number[];
//   startMonthFirstDay!: number;
//   endMonthFirstDay!: number;
//   selectedStartDate: Date;
//   selectedEndDate: Date;
//   months: string[] = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December',
//   ];
//   days: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

//   constructor() {
//     this.startDate = new Date();
//     this.endDate = new Date();
//     this.startMonth = this.startDate.getMonth();
//     this.startYear = this.startDate.getFullYear();
//     this.endMonth = this.endDate.getMonth();
//     this.endYear = this.endDate.getFullYear();
//     this.selectedStartDate = this.startDate;
//     this.selectedEndDate = this.endDate;
//     this.generateCalendar();
//   }

//   selectStartDate(day: number) {
//     this.selectedStartDate = new Date(this.startYear, this.startMonth, day);
//     this.startDate = this.selectedStartDate;
//     this.generateCalendar();
//   }

//   selectEndDate(day: number) {
//     this.selectedEndDate = new Date(this.endYear, this.endMonth, day);
//     this.endDate = this.selectedEndDate;
//     this.generateCalendar();
//   }

//   previousMonth(isStartMonth: boolean) {
//     if (isStartMonth) {
//       if (this.startMonth === 0) {
//         this.startMonth = 11;
//         this.startYear--;
//       } else {
//         this.startMonth--;
//       }
//     } else {
//       if (this.endMonth === 0) {
//         this.endMonth = 11;
//         this.endYear--;
//       } else {
//         this.endMonth--;
//       }
//     }
//     this.generateCalendar();
//   }

//   nextMonth(isStartMonth: boolean) {
//     if (isStartMonth) {
//       if (this.startMonth === 11) {
//         this.startMonth = 0;
//         this.startYear++;
//       } else {
//         this.startMonth++;
//       }
//     } else {
//       if (this.endMonth === 11) {
//         this.endMonth = 0;
//         this.endYear++;
//       } else {
//         this.endMonth++;
//       }
//     }
//     this.generateCalendar();
//   }

//   isInRange(
//     day: number,
//     month1: number,
//     year1: number,
//     month2: number,
//     year2: number
//   ): boolean {
//     const date = new Date(year1, month1, day);
//     return date >= this.selectedStartDate && date <= this.selectedEndDate;
//   }

//   getDaysInMonth(year: number, month: number): number[] {
//     const date = new Date(year, month, 1);
//     const daysInMonth = [];
//     while (date.getMonth() === month) {
//       daysInMonth.push(date.getDate());
//       date.setDate(date.getDate() + 1);
//     }
//     return daysInMonth;
//   }

//   getFirstDayOfMonth(year: number, month: number): number {
//     const date = new Date(year, month, 1);
//     return date.getDay();
//   }
// }

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
  showDatePicker = false;
  startMonth: number;
  startYear: number;
  endMonth: number;
  endYear: number;
  startMonthDays!: { day: number; className: string }[];
  endMonthDays!: { day: number; className: string }[];
  startMonthFirstDay!: number;
  endMonthFirstDay!: number;
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

  selectDate(day: number, start: boolean) {
    const date = new Date(
      start ? this.startYear : this.endYear,
      start ? this.startMonth : this.endMonth,
      day
    );
    if (start) {
      this.selectedStartDate = date;
      this.startDate = date;
      this.endMonth = this.startMonth + 1;
      this.endYear = this.startYear;
      if (this.endMonth > 11) {
        this.endMonth = 0;
        this.endYear = this.endYear + 1;
      }
      this.calculateEndMonth();
    } else {
      if (date >= this.selectedStartDate) {
        this.selectedEndDate = date;
        this.endDate = date;
      } else {
        this.selectedStartDate = date;
        this.startDate = date;
      }
    }
    this.updateDateRange();
    this.showDatePicker = false;
  }

  isInRange(
    day: number,
    month1: number,
    year1: number,
    month2: number,
    year2: number
  ): boolean {
    const start = this.selectedStartDate.getTime();
    const end = this.selectedEndDate.getTime();
    const date = new Date(year1, month1, day).getTime();
    if (start && end) {
      if (month1 === month2 && year1 === year2) {
        return date >= start && date <= end;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  calculateStartMonth() {
    this.startMonthDays = [];

    const monthStart = new Date(this.startYear, this.startMonth, 1);
    this.startMonthFirstDay = monthStart.getDay();
    const daysInMonth = new Date(
      this.startYear,
      this.startMonth + 1,
      0
    ).getDate();

    // Determine the number of days to display from the previous month
    const daysFromPrevMonth =
      this.startMonthFirstDay === 0 ? 7 : this.startMonthFirstDay;

    // Calculate the first day of the grid
    const firstDay = new Date(
      this.startYear,
      this.startMonth,
      1 - daysFromPrevMonth
    );

    // Add the days from the previous month
    for (let i = 1; i <= daysFromPrevMonth; i++) {
      this.startMonthDays.push({ day: firstDay.getDate(), className: 'empty' });
      firstDay.setDate(firstDay.getDate() + 1);
    }

    // Add the days from the current month
    for (let i = 1; i <= daysInMonth; i++) {
      this.startMonthDays.push({ day: i, className: '' });
    }

    // Add the days from the next month
    while (this.startMonthDays.length < 42) {
      this.startMonthDays.push({ day: firstDay.getDate(), className: 'empty' });
      firstDay.setDate(firstDay.getDate() + 1);
    }
  }

  calculateEndMonth() {
    this.endMonthDays = [];
    const monthStart = new Date(this.endYear, this.endMonth, 1);
    this.endMonthFirstDay = monthStart.getDay();
    const daysInMonth = new Date(this.endYear, this.endMonth + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      this.endMonthDays.push({ day: i, className: '' });
    }
    for (let i = 0; i < this.endMonthFirstDay; i++) {
      this.endMonthDays.unshift({ day: 0, className: 'empty' });
    }
  }

  updateDateRange() {
    const startDateTS = this.selectedStartDate.getTime();
    const endDateTS = this.selectedEndDate.getTime();
    const dateRange = endDateTS - startDateTS;
    this.startDate = new Date(startDateTS);
    this.endDate = new Date(endDateTS);
  }
}
