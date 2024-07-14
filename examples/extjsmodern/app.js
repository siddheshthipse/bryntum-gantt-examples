/* global Ext */
// import Gantt from '../../lib/Gantt/view/Gantt.js';

if (location.search.split(/[?&]/).includes('rtl')) {
    document.body.classList.add('b-rtl');
}

Ext.Loader.setPath('Bryntum', './Bryntum');

Ext.application({
    name : 'Main',

    requires : [
        'App.view.Main',
        'App.view.MainController',
        'Bryntum.Compat',
        'Bryntum.GanttPanel'
    ],

    launch() {
        Ext.Viewport.add({
            xtype : 'main-view'
        });
    }
});
