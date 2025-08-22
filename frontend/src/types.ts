export interface Place {
  id: number;
  name: string;
  city: string;
  country: string;
  address: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  createdAt: string;
  updatedAt: string;
}