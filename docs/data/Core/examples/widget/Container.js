targetElement.innerHTML = '<p>A Container with three widgets: a TextField, a NumberField and a Button</p>';

// a container containing three widgets
const container = new Container({
    appendTo : targetElement,
    items    : {
        name  : { type : 'text', id : 'name', value : 'Mike Mc Dermot', label : 'Name', style : 'margin-right: .5em' },
        score : { type : 'number', id : 'score', label : 'Score', value : 100, style : 'margin-right: .5em' },
        save  : {
            type    : 'button',
            text    : 'Save',
            cls     : 'b-raised',
            onClick : () => {
                const name  = container.getWidgetById('name').value,
                    score = container.getWidgetById('score').value;
                if (score > 1000) {
                    Toast.show('New highscore!');
                }
                else {
                    Toast.show(`Saving ${name}s score, which was ${score}`);
                }
            }
        }
    }
});
