interface IRecord  {
    temperature: number;
    humidity: number;
    luminosity: number;
    CO2_level: number;
    soil_moisture: number;
    pH: number;
    nutrient_level: number;
    timestamp: string;

    greenhouse: string;
    sensor_record_circuit_id: string;
};


interface IGreenhouse {
    name: string;
    location: string;
    size: number;
    greenhouse_description: string;
    logo: string;
    is_active: boolean;
    sensor_record_circuit_id: string;
    user: string;  
};

interface IGreenhouseWithRecords extends IGreenhouse {
    sensor_records: IRecord[];
}


export type { IGreenhouse, IRecord, IGreenhouseWithRecords };