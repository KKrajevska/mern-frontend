export interface UserT {
  id: string;
  name: string;
  image: string;
  places: number;
}

export interface LocationT {
  lat: number;
  lng: number;
}
export interface PlaceT {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  address: string;
  location: LocationT;
  creator: string;
}

export interface ErrorT {
  message?: string;
}
