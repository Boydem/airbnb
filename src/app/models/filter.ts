export interface Filter {
  title: string;
  img: string;
}
export interface FilterBy {
  [key: string]: string | number | Date | null | string[];
  destination: string;
  adults: number;
  children: number;
  infants: number;
  pets: number;
  guests: number;
  startDate: Date | null;
  endDate: Date | null;
  labels: string[];
}
