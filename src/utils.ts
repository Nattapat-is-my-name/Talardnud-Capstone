import { Zone, Stall } from './types';

export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const createNewStall = (name: string): Stall => ({
  id: Date.now(),
  name: name.trim(),
  numberOfStalls: 1,
  width: 2,
  height: 2,
  stallType: "",
  pricePerStall: 0,
});

export const createZoneId = (zoneName: string, date: Date): number => {
  // Create a unique number based on the zone name and date
  return parseInt(zoneName.charCodeAt(0).toString() + date.getTime().toString());
};

export const createOrUpdateZone = (
  zoneName: string,
  date: Date,
  config: Stall,
  existingZone?: Zone
): Zone => {
  const zoneId = existingZone ? existingZone.id : createZoneId(zoneName, date);
  return {
    id: zoneId,
    zone: zoneName,
    date: new Date(date),
    stalls: Array.from({ length: config.numberOfStalls }, (_, i) => ({
      ...config,
      name: `${zoneName}-${i + 1}`,
      id: Date.now() + i,
    })),
    stallConfiguration: config,
  };
};

export const generateZonesFromInput = (
  input: string,
  config: Stall,
  existingZones: Zone[],
  startDate: Date,
  endDate: Date
): Zone[] => {
  const processedInput = input.toUpperCase().replace(/\s/g, "");
  let zonesToGenerate: string[];

  if (processedInput.includes("-")) {
    const [start, end] = processedInput.split("-");
    const startIndex = ALPHABET.indexOf(start);
    const endIndex = ALPHABET.indexOf(end);

    if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
      return existingZones;
    }

    zonesToGenerate = ALPHABET.slice(startIndex, endIndex + 1).split("");
  } else {
    zonesToGenerate = processedInput.split("");
  }

  const updatedZones = new Map<number, Zone>();

  // First, add all existing zones to the map
  existingZones.forEach(zone => {
    updatedZones.set(zone.id, zone);
  });

  // Generate or update zones for the specified date range
  for (
    let currentDate = new Date(startDate);
    currentDate <= endDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    zonesToGenerate.forEach((letter) => {
      const zoneId = createZoneId(letter, currentDate);
      const existingZone = updatedZones.get(zoneId);
      
      if (existingZone) {
        // Update existing zone
        updatedZones.set(zoneId, {
          ...existingZone,
          stallConfiguration: config,
          stalls: Array.from({ length: config.numberOfStalls }, (_, i) => ({
            ...config,
            name: `${letter}-${i + 1}`,
            id: Date.now() + i,
          })),
        });
      } else {
        // Create new zone
        const newZone = createOrUpdateZone(letter, new Date(currentDate), config);
        updatedZones.set(newZone.id, newZone);
      }
    });
  }

  return Array.from(updatedZones.values());
};

export const updateZones = (
  zones: Zone[],
  updateFunction: (zone: Zone) => Zone
): Zone[] => {
  return zones.map((zone) => updateFunction(zone));
};

export const updateStalls = (
  stalls: Stall[],
  updateFunction: (stall: Stall) => Stall
): Stall[] => {
  return stalls.map((stall) => updateFunction(stall));
};