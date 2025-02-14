const style     = document.head.appendChild(document.createElement('style'));
style.innerText = `#responsiveGantt.b-responsive-small { font-size: 1.6vw; border-color: red }`;

//START
const gantt = new Gantt({
    appendTo   : targetElement,
    autoHeight : true,
    id         : 'responsiveGantt',

    tasks : [
        {
            name      : 'Plan',
            startDate : '2019-01-05',
            endDate   : '2019-01-12'
        },
        {
            name      : 'Build',
            startDate : '2019-01-03',
            endDate   : '2019-01-09'
        }
    ],

    startDate : new Date(2019, 0, 1),
    endDate   : new Date(2019, 0, 10),

    responsiveLevels : {
        small  : 600,
        normal : '*'
    }
});
