export type ParkingSpot = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    availability: number;
    color: string;
};

export const parkingSpots: ParkingSpot[] = [
    {
        id: 1,
        name: "Sc KU Food Court",
        latitude: 13.8465,
        longitude: 100.5690,
        availability: 24,
        color: "#2ecc71", // Green
    },
    {
        id: 2,
        name: "Thai Post Office Kasetsart University",
        latitude: 13.8480,
        longitude: 100.5695,
        availability: 7,
        color: "#f1c40f", // Yellow
    },
    {
        id: 3,
        name: "Kasetsart University COOP",
        latitude: 13.8455,
        longitude: 100.5675,
        availability: 0,
        color: "#e74c3c", // Red
    },
    {
        id: 4,
        name: "Engineering Building",
        latitude: 13.8470,
        longitude: 100.5700,
        availability: 12,
        color: "#2ecc71",
    },
    {
        id: 5,
        name: "Main Auditorium",
        latitude: 13.8440,
        longitude: 100.5680,
        availability: 5,
        color: "#f1c40f",
    },
];
