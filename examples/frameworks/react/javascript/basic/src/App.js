/**
 * Application
 */
import React, { Fragment } from 'react';

import { BryntumDemoHeader, BryntumGantt } from '@bryntum/gantt-react';
import { ganttConfig } from './AppConfig';
import './App.scss';

const App = () => {
    // edit button click handler
    const handleEditClick = ({ record, grid : gantt }) => {
        gantt.editTask(record);
    };

    return (
        <Fragment>
            {/* BryntumDemoHeader component is used for Bryntum example styling only and can be removed */}
            <BryntumDemoHeader />
            <BryntumGantt
                {...ganttConfig}
                extraData={{ handleEditClick }}
            />
        </Fragment>
    );
};

export default App;
