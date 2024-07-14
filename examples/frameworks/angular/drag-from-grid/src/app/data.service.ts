import * as initialData from './data';

export class DataService {
    private dataSet = 0;
    getData() {
        const data:any = {};

        Object.assign(data, initialData);
        this.dataSet = 1;

        return data;
    }
}
