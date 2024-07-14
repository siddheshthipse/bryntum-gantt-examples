/**
 * Main Application script
 */
import React, { Fragment, FunctionComponent } from 'react';

import { BryntumDemoHeader, BryntumGantt } from '@bryntum/gantt-react';
import { ganttConfig } from './AppConfig';
import './App.scss';

const App: FunctionComponent = () => {
    return (
        <Fragment>
            {/* BryntumDemoHeader component is used for Bryntum example styling only and can be removed */}
            <BryntumDemoHeader/>
            <BryntumGantt {...ganttConfig} />
        </Fragment>
    );
};

export default App;
