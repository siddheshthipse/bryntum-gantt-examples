/**
 * Application configuration
 */
import React from 'react';
import DemoButton from './components/DemoButton';
import DemoEditor from './components/DemoEditor';

const ganttConfig = {
    project : {
        autoLoad  : true,
        transport : {
            load : {
                url : 'data/launch-saas.json'
            }
        },
        // This config enables response validation and dumping of found errors to the browser console.
        // It's meant to be used as a development stage helper only so please set it to false for production systems.
        validateResponse : true
    },
    columns : [
        {
            type     : 'name',
            field    : 'name',
            width    : 250,
            renderer : ({ record }) => {
                return record.isLeaf ? <span>{record.name}</span> : <b>{record.name}</b>;
            }
        },
        {
            text                 : 'Edit<div class="small-text">(React component)</div>',
            htmlEncodeHeaderText : false,
            width                : 120,
            editor               : false,
            align                : 'center',
            // Using custom React component
            renderer             : ({ record, grid, grid: { extraData } }) =>
                record.isLeaf ? (
                    <DemoButton
                        text={'Edit'}
                        onClick={() => extraData.handleEditClick({ record, grid })}
                    />
                ) : null
        },
        {
            field                : 'draggable',
            text                 : 'Draggable<div class="small-text">(React editor)</div>',
            htmlEncodeHeaderText : false,
            width                : 120,
            align                : 'center',
            editor               : ref => <DemoEditor ref={ref} />,
            renderer             : ({ value }) => (value ? 'Yes' : 'No')
        }
    ],

    viewPreset : 'weekAndDayLetter',
    barMargin  : 10
};

export { ganttConfig };
