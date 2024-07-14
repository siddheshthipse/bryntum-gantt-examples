/**
 * Application
 */

import React, { Fragment, useRef } from 'react';

import {
    BryntumDemoHeader,
    BryntumGantt,
    BryntumCheckbox
} from '@bryntum/gantt-react';
import { ganttConfig } from './AppConfig';

import './App.scss';

const App = () => {
    const ganttRef = useRef(null);

    const onRollupsChange = ({ checked }) => {
        ganttRef.current.instance.features.rollups.disabled = !checked;
    };
    return (
        <Fragment>
            {/* BryntumDemoHeader component is used for Bryntum example styling only and can be removed */}
            <BryntumDemoHeader />
            <div className="demo-toolbar">
                <BryntumCheckbox
                    label="Show Rollups"
                    checked={true}
                    onChange={onRollupsChange}
                />
            </div>
            <BryntumGantt
                ref={ganttRef}
                {...ganttConfig}
            />
        </Fragment>
    );
};

export default App;
