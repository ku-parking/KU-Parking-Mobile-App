import { Config } from "../config";

export type ParkingSpot = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    availability: number;
    capacity: number;
    updatedAt?: string;
    color: string;
};

export const getSpotColor = (availability: number, capacity: number): string => {
    if (capacity <= 0) return "#e74c3c"; // Red fallback
    const ratio = availability / capacity;
    if (ratio >= Config.colorThresholds.green) return "#2ecc71"; // Green (Most available)
    if (ratio >= Config.colorThresholds.yellow) return "#f1c40f"; // Yellow (Middle)
    return "#e74c3c"; // Red (Most unavailable)
};

const rawSpots = [
    {
        id: 1,
        name: "Sc KU Food Court",
        latitude: 13.845802,
        longitude: 100.570707,
        availability: 40,
        capacity: 40,
    },
    {
        id: 2,
        name: "Thai Post Office Kasetsart University",
        latitude: 13.847130,
        longitude: 100.568588,
        availability: 7,
        capacity: 35,
    },
    {
        id: 3,
        name: "Kasetsart University COOP",
        latitude: 13.844964,
        longitude: 100.567642,
        availability: 0,
        capacity: 20,
    },
];

export const parkingSpots: ParkingSpot[] = rawSpots.map(spot => ({
    ...spot,
    color: getSpotColor(spot.availability, spot.capacity)
}));

type ParkingSpotApiResponse = Omit<ParkingSpot, "color" | "updatedAt"> & {
    updated_at?: string;
};

export const fetchParkingSpots = async (): Promise<ParkingSpot[]> => {
    const endpoint = `${Config.apiBaseUrl}/parking-spots`;
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error(`Failed to fetch parking spots from ${endpoint}: ${response.status}`);
    }

    const data = (await response.json()) as ParkingSpotApiResponse[];
    return data.map((spot) => ({
        id: spot.id,
        name: spot.name,
        latitude: spot.latitude,
        longitude: spot.longitude,
        availability: spot.availability,
        capacity: spot.capacity,
        updatedAt: spot.updated_at,
        color: getSpotColor(spot.availability, spot.capacity),
    }));
};
