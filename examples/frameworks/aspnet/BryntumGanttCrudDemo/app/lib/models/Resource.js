import { ResourceModel } from '@bryntum/gantt';

export default class Resource extends ResourceModel {
    static get fields() {
        return [
            { name : 'Id' },
            { name : 'name', dataSource : 'Name' },
            { name : 'calendar', dataSource : 'CalendarId', serialize : calendar => calendar && calendar.id }
        ];
    }
}

Resource.idField = 'Id';
