CSSHelper.insertRule('#my-list, .b-list .b-list-title { display:grid; gap:1em; background:transparent;}');
CSSHelper.insertRule('#my-list .b-list-item:not(.b-list-title) { padding:1em;background:#eee;border-radius:1em; }');

new SlideToggle({
    appendTo : targetElement,
    label    : 'Multiselect',
    checked  : true,
    style    : 'margin-bottom:1em',
    onChange({ checked }) {
        list.multiSelect = checked;
    }
});

const list = new List({
    title       : 'Favourite foods',
    id          : 'my-list',
    width       : 200,
    appendTo    : targetElement,
    multiSelect : true,
    itemTpl     : item => `${item.text}`,
    items       : [{
        id   : 1,
        text : 'Eggs'
    }, {
        id   : 2,
        text : 'Beef'
    }, {
        id   : 3,
        text : 'Bread'
    }, {
        id   : 4,
        text : 'Cucumber'
    }, {
        id   : 5,
        text : 'Juice'
    }, {
        id   : 6,
        text : 'Tomatoes'
    }, {
        id   : 7,
        text : 'Bacon'
    }],
    onItem({ record }) {
        Toast.show('You clicked ' + record.text);
    },
    selected : [1, 2, 3]
});
