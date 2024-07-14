/**
 * The App file. It should stay as simple as possible
 */

import React, { Fragment } from 'react';
import { BryntumDemoHeader, BryntumGantt } from '@bryntum/gantt-react';
import { ganttConfig } from './AppConfig';
import './App.scss';

const App = () => {
    return (
        <Fragment>
            {/* BryntumDemoHeader component is used for Bryntum example styling only and can be removed */}
            <BryntumDemoHeader />
            <BryntumGantt
                {...ganttConfig}
            />
        </Fragment>
    );
};

export default App;
