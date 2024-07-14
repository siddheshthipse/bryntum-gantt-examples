/**
 * Application
 */
import React, { useRef, useEffect, useState } from 'react';
import {
    BryntumGantt,
    BryntumDemoHeader
} from '@bryntum/gantt-react';
import { ganttConfig } from './AppConfig';
import './App.scss';

function App() {
    const ganttComponent = useRef();

    const [baselineCls, setBaselineCls] = useState({
        'b-hide-baseline-1' : false,
        'b-hide-baseline-2' : false,
        'b-hide-baseline-3' : false
    });

    function onShowBaselinesCheck({ checked }) {
        ganttComponent.current.instance.features.baselines.disabled = !checked;
    }

    function onSetBaselineItem({ source }) {
        let index;

        switch (source.ref) {
            case 'setBaseline1':
                index = 1;
                break;
            case 'setBaseline2':
                index = 2;
                break;
            case 'setBaseline3':
                index = 3;
                break;
            default:
                index = 1;
                break;
        }

        ganttComponent.current.instance.taskStore.setBaseline(index);
    }

    function onShowBaselineItem({ source, checked }) {
        if (source.isMenuItem) {
            let index;

            switch (source.ref) {
                case 'showBaseline1':
                    index = 1;
                    break;
                case 'showBaseline2':
                    index = 2;
                    break;
                case 'showBaseline3':
                    index = 3;
                    break;
                default:
                    index = 1;
                    break;
            }

            baselineCls[`b-hide-baseline-${index}`] = !checked;
            setBaselineCls({ ...baselineCls });
        }
    }

    useEffect(() => {
        const { showBaselines, setMenuButton, showMenuButton } = ganttComponent.current.instance.widgetMap;

        showBaselines.on({ change : onShowBaselinesCheck, thisObj : this });
        setMenuButton.on({ item : onSetBaselineItem, thisObj : this });
        showMenuButton.on({ toggle : onShowBaselineItem, thisObj : this });
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {/* BryntumDemoHeader component is used for Bryntum example styling only and can be removed */}
            <BryntumDemoHeader />
            <BryntumGantt
                ref={ganttComponent}
                cls={baselineCls}
                {...ganttConfig}
            />
        </>
    );
}

export default App;
