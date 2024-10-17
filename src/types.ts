export interface Stall {
  id: number;
  name: string;
  numberOfStalls: number;
  width: number;
  height: number;
  stallType: string;
  pricePerStall: number;
}

export interface Zone {
  id: number;
  zone: string; // Zone identifier
  date: Date;
  stalls: Stall[]; // Stalls belong to this zone
  stallConfiguration: Stall; // Configuration object
}

export interface Slot {
  id: string;
  market_id: string;
  name: string;
  zone: string;
  width: number;
  height: number;
  price: number;
  status: string;
  category: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface Market {
  id: string;
  name: string;
  description: string;
  address: string;
  open_time: string;
  close_time: string;
  image: string;
  layout_image: string;
  slots: Slot[];
}

export interface ApiResponse {
  data: Market[];
  message: string;
  status: string;
}