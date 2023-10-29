import { IGreenhouse } from "src/types/Greenhouse"

const greenhousesMock = [
    {
        name: 'Organic Greens Hub',
        location: 'Sunny Valley, CA',
        size: 120,
        description: 'A modern greenhouse specializing in organic vegetables.',
        logo: 'https://images.pexels.com/photos/1459497/pexels-photo-1459497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        records: [
            {
                timestamp: '2023-01-01T12:00:00',
                temperature: 26.5,
                humidity: 65,
                luminosity: 5500,
                CO2_level: 420,
                soil_moisture: 0.6,
                pH: 6.2,
                nutrient_level: 220,
            },
        ],
    },
    {
        name: 'Floral Harmony Garden',
        location: 'Mountain View, CO',
        size: 180,
        description: 'A family-owned greenhouse with a focus on flowers and herbs.',
        logo: 'https://images.pexels.com/photos/1093216/pexels-photo-1093216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        records: [
            {
                timestamp: '2023-02-05T15:45:00',
                temperature: 22.0,
                humidity: 50,
                luminosity: 4800,
                CO2_level: 400,
                soil_moisture: 0.5,
                pH: 6.8,
                nutrient_level: 190,
            },
        ],
    },
    {
        name: 'Sustainable Innovations Lab',
        location: 'Coastal Farm, OR',
        size: 250,
        description: 'An experimental greenhouse researching sustainable practices.',
        logo: 'https://images.pexels.com/photos/399969/pexels-photo-399969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        records: [
            {
                timestamp: '2023-03-10T09:30:00',
                temperature: 28.0,
                humidity: 70,
                luminosity: 6000,
                CO2_level: 450,
                soil_moisture: 0.7,
                pH: 6.0,
                nutrient_level: 200,
            },
            {
                timestamp: '2023-03-12T11:15:00',
                temperature: 25.5,
                humidity: 65,
                luminosity: 5800,
                CO2_level: 430,
                soil_moisture: 0.6,
                pH: 6.5,
                nutrient_level: 210,
            },
        ],
    },
] as IGreenhouse[]

export { greenhousesMock }