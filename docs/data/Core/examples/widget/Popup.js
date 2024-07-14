// button that display a popup containing html
new Button({
    appendTo : targetElement,
    cls      : 'b-raised',
    text     : 'Show html popup',
    style    : 'margin-right: .5em',
    onClick  : function(e) {
        const popup = new Popup({
            header      : 'A simple text Popup',
            autoShow    : false,
            centered    : true,
            closeAction : 'destroy',
            closable    : true,
            width       : '30em',
            bbar        : {
                items : {
                    close : {
                        text     : 'Close',
                        minWidth : 100,
                        onAction : 'up.close'
                    }
                }
            },
            html : `<h3 style="margin-top:0.5em">Bacon ipsum dolor </h3>
                    <p style="line-height:1.5em">amet flank ribeye ham hock, 
                     rump alcatra pork belly pancetta leberkas bacon shoulder 
                    meatloaf ball tip pig. Tongue jerky meatloaf pancetta 
                    pork sirloin. Hamburger corned beef ball tip cupim 
                    sirloin frankfurter tri-tip. Swine kevin ham hock, 
                    drumstick flank pig shoulder shankle. Tri-tip pork 
                    chop fatback turducken pork salami. Tongue boudin 
                    salami flank bacon sirloin</p>`
        });
        popup.show();
    }
});

// button that displays a popup containing widgets
new Button({
    appendTo : targetElement,
    cls      : 'b-raised',
    text     : 'Show widget popup',
    ripple   : false,
    onClick  : function({ source }) {
        const popup = new Popup({
            owner       : source,
            header      : 'Anchored Popup containing Widgets',
            autoShow    : false,
            closable    : true,
            closeAction : 'destroy',
            width       : '27em',
            minHeight   : '18em',
            align       : {
                align  : 't-b',
                anchor : true
            },
            bbar : {
                items : {
                    cancel : {
                        text     : 'Cancel',
                        minWidth : 100,
                        onAction : 'up.close'
                    },
                    close : {
                        text     : 'OK',
                        minWidth : 100,
                        cls      : 'b-raised b-blue',
                        onAction : () => {
                            Toast.show('Hello ' + popup.widgetMap.nameField.value);
                            popup.close();
                        }
                    }
                }
            },
            items : {
                // a text field
                nameField : {
                    type  : 'text',
                    label : 'Enter your name'
                }
            }
        });
        popup.showBy(source.element);
    }
});
