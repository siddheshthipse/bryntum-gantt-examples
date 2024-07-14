/**
 * Application
 *
 * Please note that this example uses the Bryntum Scheduler Pro, which is licensed separately.
 */

import React, { useEffect, useRef } from 'react';

import {
    BryntumDemoHeader,
    BryntumGantt,
    BryntumSchedulerPro,
    BryntumSplitter,
    BryntumButton
} from '@bryntum/gantt-react';
import { Toast } from '@bryntum/gantt';

import { ganttConfig, schedulerConfig } from './AppConfig';
import './App.scss';

const App = () => {

    const ganttRef = useRef();
    const schedulerRef = useRef();

    useEffect(() => {
        schedulerRef.current.instance.addPartner(ganttRef.current.instance);

        Toast.show({
            timeout : 3000,
            html    : 'Please note that this example uses the Bryntum Scheduler Pro, which is licensed separately.'
        });

    }, []);

    // ZoomIn/ZoomOut handler
    const zoom = action => {
        ganttRef.current.instance[`zoom${action}`]();
    };

    return (
        <>
            {/* BryntumDemoHeader component is used for Bryntum example styling only and can be removed */}
            <BryntumDemoHeader
                children={
                    <>
                        <BryntumButton
                            icon="b-icon-search-plus"
                            cls="b-raised b-blue"
                            tooltip="Zoom In"
                            onClick={() => zoom('In')}
                        />
                        <BryntumButton
                            icon="b-icon-search-minus"
                            cls="b-raised b-blue"
                            tooltip="Zoom Out"
                            onClick={() => zoom('Out')}
                        />
                    </>
                }
            />
            <div
                style={{
                    display       : 'flex',
                    flexDirection : 'column',
                    flex          : 1
                }}
            >
                <BryntumGantt
                    ref={ganttRef}
                    {...ganttConfig}
                />
                <BryntumSplitter />
                {/* Please note that this example uses the Bryntum Scheduler Pro, which is licensed separately. */}
                <BryntumSchedulerPro
                    ref={schedulerRef}
                    {...schedulerConfig}
                />
            </div>
        </>
    );
};

export default App;
