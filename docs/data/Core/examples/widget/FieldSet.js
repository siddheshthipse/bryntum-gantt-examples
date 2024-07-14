new FieldSet({
    appendTo : targetElement,
    title    : 'The FieldSet widget',
    width    : '20em',
    items    : [
        {
            type  : 'text',
            label : 'Username'
        },
        {
            type  : 'password',
            label : 'Enter password'
        },
        {
            type  : 'password',
            label : 'Repeat password'
        },
        {
            type  : 'button',
            text  : 'Register',
            style : 'margin:2em 0 1em 0',
            onClick() {
                Toast.show('You clicked the button');
            }
        }
    ]
});
