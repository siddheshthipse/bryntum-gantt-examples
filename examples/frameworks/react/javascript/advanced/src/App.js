/**
 * The App file. It should stay as simple as possible
 */

// React libraries
import React, { Fragment } from 'react';

import { BryntumDemoHeader } from '@bryntum/gantt-react';
import Gantt from './components/Gantt';

import './App.scss';

const App = props => {
    return (
        <Fragment>
            {/* BryntumDemoHeader component is used for Bryntum example styling only and can be removed */}
            <BryntumDemoHeader/>
            <Gantt />
        </Fragment>
    );
};

export default App;
