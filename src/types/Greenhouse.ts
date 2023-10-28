interface IRecord  {
    timestamp: string;
    temperature: number;
    humidity: number;
    luminosity: number;
    CO2_level: number;
    soil_moisture: number;
    pH: number;
    nutrient_level: number;
};


interface IGreenhouse {
    name: string;
    location: string;
    size: number;
    description: string;

    logo: string;
    records: IRecord[];
};


export type { IGreenhouse, IRecord };