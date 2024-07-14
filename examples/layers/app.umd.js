var {
    Gantt
} = bryntum.gantt;
const gantt = new Gantt({
    appendTo : 'container',
    project  : {
        autoLoad : true,
        loadUrl  : '../_datasets/timeranges.json'
    },
    dependencyIdField : 'sequenceNumber',
    columns           : [{
        type  : 'name',
        field : 'name',
        text  : 'Name',
        width : 250
    }],
    viewPreset : 'weekAndDayLetter',
    features   : {
        progressLine : {
            statusDate : new Date(2019, 0, 27)
        },
        timeRanges : true
    },
    strips : {
        right : {
            type        : 'panel',
            title       : 'Layers',
            dock        : 'right',
            collapsible : true,
            width       : '20em',
            cls         : 'b-sidebar',
            scrollable  : {
                overflowY : true
            },
            defaults : {
                labelPosition : 'above',
                width         : '15em'
            },
            items : [{
                type        : 'list',
                flex        : 1,
                multiSelect : true,
                itemTpl     : record => `<span>${record.text}</span><i class="b-fa b-fa-chevron-up" data-noselect></i><i class="b-fa b-fa-chevron-down" data-noselect></i>`,
                selected    : [1, 2, 3, 4, 5, 6, 7],
                items       : [{
                    id       : 1,
                    text     : 'Progress Line',
                    selector : '.b-progress-line-canvas'
                }, {
                    id       : 2,
                    text     : 'Tasks',
                    selector : '.b-sch-foreground-canvas'
                }, {
                    id       : 3,
                    text     : 'Dependencies',
                    selector : '.b-sch-dependencies-canvas'
                }, {
                    id       : 4,
                    text     : 'Time Ranges',
                    selector : '.b-sch-timeranges-canvas'
                }, {
                    id       : 5,
                    text     : 'Rows',
                    selector : '.b-timeaxissubgrid .b-grid-row'
                }, {
                    id       : 6,
                    text     : 'Time axis tick lines',
                    selector : '.b-column-lines-canvas'
                }, {
                    id       : 7,
                    text     : 'Nonworking time',
                    selector : '.b-sch-nonworkingtime-canvas'
                }],
                onItem            : 'up.onListItemClick',
                onSelectionChange : 'up.onListSelectionChange'
            }]
        }
    },
    onListItemClick({
        source: list,
        index,
        record,
        event
    }) {
        const {
            store
        } = list;
        if (event.target.matches('.b-fa-chevron-up')) {
            if (index > 0) {
                store.move(record, store.getAt(index - 1));
                this.applyZIndexes(store);
            }
        }
        else if (event.target.matches('.b-fa-chevron-down')) {
            if (index < store.count - 1) {
                store.move(record, store.getAt(index + 2));
                this.applyZIndexes(store);
            }
        }
    },
    onListSelectionChange({
        source: list,
        selected
    }) {
        if (this.element) {
            // Highlight selected canvas
            this.element.querySelectorAll('.b-disabled').forEach(el => el.classList.remove('b-disabled'));
            list.store.forEach(item => {
                if (!list.selected.includes(item)) {
                    this.element.querySelectorAll(item.selector).forEach(el => el.classList.add('b-disabled'));
                }
            });
        }
    },
    applyZIndexes(store) {
        store.forEach((record, index) => {
            this.element.querySelectorAll(record.selector).forEach(el => el.style.zIndex = 1000 - index);
        });
    }
});
