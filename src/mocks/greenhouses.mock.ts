import { IGreenhouse, IGreenhouseWithRecords, IRecord } from "src/types/Greenhouse"

const mockGreenhouses: IGreenhouse[] = [
    {
        name: 'Greenhouse A',
        location: 'Location A',
        size: 150,
        greenhouse_description: 'Description A',
        logo: 'path/to/logoA.png',
        is_active: true,
        sensor_record_circuit_id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        user: 'JaneDoe',
    },
    {
        name: 'Greenhouse B',
        location: 'Location B',
        size: 200,
        greenhouse_description: 'Description B',
        logo: 'path/to/logoB.png',
        is_active: false,
        sensor_record_circuit_id: '123e4567-e89b-12d3-a456-426614174001',
        user: 'BobSmith',
    },
];

const mockRecords: IRecord[] = [
    {
        temperature: 22,
        humidity: 55,
        luminosity: 1000,
        CO2_level: 350,
        soil_moisture: 35,
        pH: 7.0,
        nutrient_level: 180,
        greenhouse: 'Greenhouse A',
        timestamp: '2023-10-31T12:15:00',
        sensor_record_circuit_id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    },
    {
        temperature: 28,
        humidity: 65,
        luminosity: 1200,
        CO2_level: 450,
        soil_moisture: 45,
        pH: 6.0,
        nutrient_level: 220,
        greenhouse: 'Greenhouse B',
        timestamp: '2023-10-31T12:30:00',
        sensor_record_circuit_id: '123e4567-e89b-12d3-a456-42661417400',
    },
    {
        temperature: 28,
        humidity: 65,
        luminosity: 1200,
        CO2_level: 450,
        soil_moisture: 45,
        pH: 6.0,
        nutrient_level: 220,
        greenhouse: 'Greenhouse B',
        timestamp: '2023-10-31T12:30:00',
        sensor_record_circuit_id: '123e4567-e89b-12d3-a456-42661417400',
    },
];


export { mockGreenhouses, mockRecords }