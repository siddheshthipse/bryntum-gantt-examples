import Store from '../../../lib/Core/data/Store.js';
import Color from './Color.js';

// Define a separate store holding additional data that we can attach to the main TaskModel, to
// demonstrate setting up relations between models and filtering on them
const colorStore = new Store({
    modelClass : Color,
    data       : [
        { id : 1, name : 'Red' },
        { id : 2, name : 'Green' },
        { id : 3, name : 'Blue' },
        { id : 4, name : 'Chartreuse' },
        { id : 5, name : 'Oatmeal Heather' }
    ]
});

export default colorStore;
