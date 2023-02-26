import { Host } from './host';
import { Review } from './review';
import { User } from './user';

export interface Stay {
  name: string;
  type: string;
  imgUrls: string[];
  price: number;
  summary: string;
  amenities: string[];
  roomType: string;
  host: Host;
  loc: Location;
  reviews: Review[];
  likedByUsers: User[];
  labels: string[];
  stayDetails: { [key: string]: number };
}
export interface StayPreview {
  name: string;
  type: string;
  imgUrls: string[];
  price: number;
  isSuperHost: boolean;
  loc: Location;
  avgRate: string;
  // likedByUser: boolean;
}

interface Location {
  country: string;
  countryCode: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
}

export interface LatLngPoint {
  lat: number;
  lng: number;
}
