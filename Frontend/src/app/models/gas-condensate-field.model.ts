export interface GasCondensateField {
    id: number;
    fieldName: string;
    latitude: number;
    longitude: number;
    productionRate: number; // barrels/day
    cost: number;
    yearOfExtraction: number;
    maintenanceType: string;
  }