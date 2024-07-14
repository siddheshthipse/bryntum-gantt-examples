/**
 * The App file. It should stay as simple as possible
 */

import React, { Fragment, useEffect, useRef } from 'react';
import {
    BryntumDemoHeader,
    BryntumGantt,
    BryntumSplitter,
    BryntumGrid
} from '@bryntum/gantt-react';
import { Toast } from '@bryntum/gantt';
import { ganttConfig, gridConfig } from './AppConfig';
import './App.scss';

const App = () => {
    const ganttRef = useRef(null);
    const gridRef = useRef(null);

    // set grid store to timeRanges store
    useEffect(() => {
        gridRef.current.instance.store = ganttRef.current.instance.features.timeRanges.store;
        Toast.show({
            timeout : 3000,
            html    : 'Please note that this example uses the Bryntum Grid, which is licensed separately.'
        });
    }, []);

    // Add time range button click handler
    const addTimeRange = () => {
        gridRef.current.instance.store.add({
            name      : 'New range',
            startDate : new Date(2019, 0, 10),
            duration  : 5
        });
    };

    // Toggle Show headers handler
    const toggleShowHeaders = ({ source }) => {
        ganttRef.current.instance.features.timeRanges.showHeaderElements = source.pressed;
    };

    return (
        <Fragment>
            {/* BryntumDemoHeader component is used for Bryntum example styling only and can be removed */}
            <BryntumDemoHeader />
            <div id="content">
                <BryntumGantt
                    ref={ganttRef}
                    {...ganttConfig}
                    bbar={{
                        cls   : 'gantt-bbar',
                        items : [
                            {
                                toggleable  : true,
                                text        : 'Show header elements',
                                tooltip     : 'Toggles the rendering of time range header elements',
                                pressed     : true,
                                icon        : 'b-fa-square',
                                pressedIcon : 'b-fa-check-square',
                                onClick     : toggleShowHeaders
                            }
                        ]
                    }}
                />
                <BryntumSplitter />
                <BryntumGrid
                    ref={gridRef}
                    {...gridConfig}
                    bbar={[
                        {
                            text    : 'Add time range',
                            icon    : 'b-fa-plus',
                            cls     : 'b-green',
                            onClick : addTimeRange
                        }
                    ]}
                />
            </div>
        </Fragment>
    );
};

export default App;
