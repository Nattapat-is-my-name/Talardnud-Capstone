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
  id: number; // Changed from string to number
  zone: string;
  date: Date;
  stalls: Stall[];
  stallConfiguration: Stall;
}