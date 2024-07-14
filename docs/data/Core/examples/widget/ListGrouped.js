new SlideToggle({
    appendTo   : targetElement,
    label      : 'Multiselect',
    checked    : true,
    labelWidth : '13em',
    onChange({ checked }) {
        list.multiSelect = checked;
    }
});

new SlideToggle({
    appendTo   : targetElement,
    label      : 'Collapsible groups',
    checked    : true,
    style      : 'margin-bottom:1em',
    labelWidth : '13em',
    onChange({ checked }) {
        list.collapsibleGroups = checked;
    }
});

const list = new List({
    width             : 300,
    height            : 300,
    appendTo          : targetElement,
    multiSelect       : true,
    displayField      : 'name',
    valueField        : 'id',
    collapsibleGroups : true,
    allowGroupSelect  : false,
    selected          : [1, 2, 4],
    itemTpl           : item => item.name,
    // Show icon based on group name
    groupHeaderTpl    : (record, groupName) => {
        let icon;
        switch (groupName) {
            case 'Drinks':
                icon = 'wine-bottle';
                break;
            case 'Food':
                icon = 'pizza-slice';
                break;
            case 'Snacks':
                icon = 'cookie-bite';
                break;
        }
        return `<i class="b-fa b-fa-${icon}" style="margin-inline-end:.7em"></i>${groupName}`;
    },
    store : {
        fields : [
            'type'
        ],
        groupers : [
            { field : 'type', ascending : true }
        ],
        data : [
            { id : 1, name : 'pizza', type : 'food' },
            { id : 2, name : 'bacon', type : 'food' },
            { id : 3, name : 'egg', type : 'food' },
            { id : 4, name : 'Gin tonic', type : 'drinks' },
            { id : 5, name : 'Wine', type : 'drinks' },
            { id : 6, name : 'Pepsi', type : 'drinks' },
            { id : 7, name : 'Potato chips', type : 'snacks' },
            { id : 8, name : 'Pretzels', type : 'snacks' },
            { id : 9, name : 'Popcorn', type : 'snacks' },
            { id : 10, name : 'Chocolate bar', type : 'snacks' },
            { id : 11, name : 'Trail mix', type : 'snacks' }
        ]
    },
    onItem({ item }) {
        Toast.show('You clicked ' + item.innerText);
    }
});
