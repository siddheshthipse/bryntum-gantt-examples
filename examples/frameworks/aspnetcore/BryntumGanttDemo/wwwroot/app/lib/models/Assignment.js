import { AssignmentModel } from '@bryntum/gantt';

export default class Assignment extends AssignmentModel {
    static get fields() {
        return [
            { name : 'Id' },
            { name : 'units', dataSource : 'Units' },
            { name : 'event', dataSource : 'TaskId', serialize : event => event && event.id },
            { name : 'resource', dataSource : 'ResourceId', serialize : resource => resource && resource.id }
        ];
    }
}

Assignment.idField = 'Id';
