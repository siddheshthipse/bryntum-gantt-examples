const project = new ProjectModel({
    startDate : new Date(2020, 0, 1),

    eventsData : [
        { id : 2, name : 'Proof-read docs', startDate : '2020-01-02', endDate : '2020-01-05', effort : 0 },
        { id : 3, name : 'Release alpha', startDate : '2020-01-09', endDate : '2020-01-10', effort : 0 },
        { id : 4, name : 'Release beta', startDate : '2020-01-10', endDate : '2020-01-11', effort : 0 },
        { id : 5, name : 'Release RC', startDate : '2020-01-11', endDate : '2020-01-12', effort : 0 },
        { id : 6, name : 'Release GA', startDate : '2020-01-12', endDate : '2020-01-13', effort : 0 }
    ],

    resourcesData : [
        { id : 1, name : 'John Johnson' },
        { id : 2, name : 'Janet Janetson' },
        { id : 3, name : 'Kermit the Frog' },
        { id : 4, name : 'Kermit the Frog Jr.' }
    ],

    assignmentsData : [
        { resource : 1, event : 2, units : 50 },
        { resource : 3, event : 2 }
    ],

    dependenciesData : [
        { fromEvent : 2, toEvent : 3 },
        { fromEvent : 3, toEvent : 4 },
        { fromEvent : 4, toEvent : 6 }
    ]
});

new DependencyField({
    appendTo        : targetElement,
    store           : project.taskStore,
    dependencyStore : project.dependencyStore,
    otherSide       : 'from',
    ourSide         : 'to',
    value           : project.firstChild.dependencies
});
