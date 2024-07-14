import ArrayHelper from '../../../lib/Core/helper/ArrayHelper.js';
import StringHelper from '../../../lib/Core/helper/StringHelper.js';
import Panel from '../../../lib/Core/widget/Panel.js';
import Widget from '../../../lib/Core/widget/Widget.js';

/**
 * Simple widget which shows checklist of filter options, given a Gantt and a single field name from the Task model
 */
export default class GanttTaskFacetFilter extends Panel {
    // The $name static class property is needed due to class name compression by the code minifier.
    // This should match what would normally be returned by the name property of the constructor.
    static $name = 'GanttTaskFacetFilter';

    // The static configurable property is used for class-level properties
    // The properties provided in the object will be tracked for changes
    static configurable = {
        layout      : 'vbox',
        ui          : 'toolbar',
        collapsible : {
            direction : 'up'
        },
        gantt     : null,
        fieldName : null
    };

    // The type property specifies the short name for the widget.
    // It is used when creating an instance from a config object
    static type = 'gantttaskfacetfilter';

    static getFieldValues(dataStore, fieldName) {
        const
            emptyString  = '',
            field        = dataStore.modelClass.getFieldDefinition(fieldName),
            uniqueValues = dataStore.getDistinctValues(fieldName, true),
            toString     = x => x == undefined ? emptyString : String(x);

        if (field.type === 'number') {
            uniqueValues.sort((a, b) => a - b);
        }
        else if (field.type === 'boolean') {
            return [true, false];
        }
        else {
            uniqueValues.sort((a, b) => toString(a).localeCompare(toString(b)));
        }
        return uniqueValues;
    }

    refreshOptions() {
        const
            { fieldName, gantt : { taskStore, columns } } = this,
            column          = columns.get(fieldName),
            values          = GanttTaskFacetFilter.getFieldValues(taskStore, fieldName),
            fieldType       = taskStore.modelClass.getFieldDefinition(fieldName).type,
            useStringValues = !['number', 'boolean'].includes(fieldType),
            checked         = new Set(this.items?.filter(item => item.checked)
                .map(item => item.checkedValue) ?? []),
            hasIds = Array.isArray(values?.[0]);

        this.title = StringHelper.encodeHtml(column.text);

        this.items = values.map(value => {
            let checkedValue = hasIds ? value[0] : value;
            if (useStringValues) {
                checkedValue = StringHelper.encodeHtml(checkedValue);
            }
            return {
                type      : 'checkbox',
                checkedValue,
                text      : StringHelper.capitalize(StringHelper.encodeHtml(String(hasIds ? value[1] : value))),
                fieldName,
                checked   : checked.has(checkedValue),
                listeners : {
                    change : 'up.onCheckboxChange'
                }
            };
        });
    }

    // Triggered when changing "gantt" config
    updateGantt(gantt) {
        this.refreshOptions();

        gantt.taskStore.on({
            add     : 'refreshOptions',
            update  : 'refreshOptions',
            remove  : 'refreshOptions',
            load    : 'refreshOptions',
            thisObj : this
        });
    }

    onCheckboxChange({ source }) {
        // Apply style to checkbox based of state
        source.cls = { [`b-${this.type}-item-active`] : source.checked };

        const
            filters   = {},
            { taskStore } = this.gantt;

        // Collect filters from checked checkboxes with existing fieldName
        for (const checkBox of Widget.queryAll('checkbox').filter(checkBox => checkBox.checked && checkBox.fieldName)) {
            filters[checkBox.fieldName] = [...filters[checkBox.fieldName] ?? [], checkBox.checkedValue];
        }

        // Clean existing filters
        taskStore.clearFilters();
        // Apply active filters
        for (const fieldName in filters) {
            taskStore.filter({
                id       : fieldName,
                property : fieldName,
                operator : 'isIncludedIn',
                value    : filters[fieldName]
            });
        }
    }
}

// Register this widget type with its Factory
GanttTaskFacetFilter.initClass();
