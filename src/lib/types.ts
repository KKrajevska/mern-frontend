export interface UserT {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  places: PlaceT[];
}

export interface LocationT {
  lat: number;
  lng: number;
}
export interface PlaceT {
  id: string;
  title: string;
  description: string;
  image: string;
  address: string;
  location: LocationT;
  creator: string;
}

export interface ErrorT {
  message?: string;
}

export interface AuthResponse {
  userId: string;
  email: string;
  token: string;
}
