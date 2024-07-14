targetElement.innerHTML = '<div id="slideToggle" class="centeredColumn" style="display:flex;flex-direction:row;width:100%"></div>';

new SlideToggle({
    insertFirst : targetElement,
    label       : 'Show close icon',
    checked     : true,
    onChange({ value }) {
        chipView.closable = value;
    }
});

// checkbox with default look
const chipView = new ChipView({
    appendTo : slideToggle,
    style    : 'display:flex',
    items    : [
        'Coke',
        'Pepsi',
        'Water',
        'Fanta',
        'Fernet'
    ]
});
