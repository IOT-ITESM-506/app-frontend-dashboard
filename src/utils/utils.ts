import { IGreenhouse, IRecord, IGreenhouseWithRecords } from "src/types/Greenhouse";

const USER_PROFILE_PICTURE = 'https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/dl4yhkpeuwqwfmbqsfwc';

function mergeGreenhousesAndRecords(greenhouses: IGreenhouse[], records: IRecord[]): IGreenhouseWithRecords[] {
    const mergedGreenhouses: IGreenhouseWithRecords[] = [];
    greenhouses.forEach((greenhouse: IGreenhouse) => {
        const matchingRecords = records.filter((record) => record.sensor_record_circuit_id === greenhouse.sensor_record_circuit_id);
        const mergedGreenhouse: IGreenhouseWithRecords = {
            ...greenhouse,
            sensor_records: matchingRecords,
        };
        mergedGreenhouses.push(mergedGreenhouse);
    })
    return mergedGreenhouses;
}

export {
    USER_PROFILE_PICTURE,
    mergeGreenhousesAndRecords
}