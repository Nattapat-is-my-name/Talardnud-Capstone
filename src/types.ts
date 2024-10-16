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
