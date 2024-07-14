import { BryntumGanttProps } from '@bryntum/gantt-react';
import styles from '../App.module.scss';

export const ganttConfig: Partial<BryntumGanttProps> = {

    cls : styles.gantt,

    viewPreset : 'weekAndDayLetter',

    barMargin : 10,

    autoHeight : true,

    columns : [
        { type : 'name', field : 'name', width : 250 }
    ],

    rollupsFeature : true,

    filterFeature : true,

    dependencyEditFeature : true,

    timeRangesFeature : {
        showCurrentTimeLine : true
    },

    labelsFeature : {
        left : {
            field  : 'name',
            editor : {
                type : 'textfield'
            }
        }
    }
};
