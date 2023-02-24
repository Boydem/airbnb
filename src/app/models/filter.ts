export interface Filter {
  title: string;
  img: string;
}
export interface FilterBy {
  [key: string]: string | number;
  destination: string;
  adults: number;
  children: number;
  infants: number;
  pets: number;
}
