import StringHelper from '../../../lib/Core/helper/StringHelper.js';
import List from '../../../lib/Core/widget/List.js';

/**
 * @module ResourceList
 */

/**
 * @internal
 */
export default class ResourceList extends List {

    // Factoryable type name
    static get type() {
        return 'resourcelist';
    }

    static get configurable() {
        return {
            title   : 'Resources',
            cls     : 'b-inline-list',
            items   : [],
            itemTpl : resource => {
                return StringHelper.xss`
                    <img src="../_shared/images/users/${resource.name.toLowerCase()}.jpg">
                    <div class="b-resource-detail">
                        <div class="b-resource-name">${resource.name}</div>
                        <div class="b-resource-city">
                            ${resource.city}
                            <i data-btip="Deassign resource" class="b-icon b-icon-trash"></i>
                        </div>
                    </div>
                `;
            }
        };
    }

    // Called by the owning TaskEditor whenever a task is loaded
    loadEvent(taskRecord) {
        this.taskRecord = taskRecord;
        this.store.data = taskRecord.resources;
    }

    // Called on item click
    onItem({ event, record }) {
        if (event.target.matches('.b-icon-trash')) {
            // Unassign the clicked resource record from the currehtly loaded task
            this.taskRecord.unassign(record);

            // Update our store with the new assignment set
            this.store.data = this.taskRecord.resources;
        }
    }
}

// Register this widget type with its Factory
ResourceList.initClass();
