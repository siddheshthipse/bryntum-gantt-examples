/**
 * The React App file
 */
import React, { Fragment, useRef } from 'react';

import {
    BryntumTimeline,
    BryntumGantt,
    BryntumDemoHeader,
    BryntumButtonGroup
} from '@bryntum/gantt-react'; //'./components/BryntumTimeline';
import { ProjectModel } from '@bryntum/gantt';
import { ganttConfig, timelineConfig } from './AppConfig';
import './App.scss';

const App = () => {
    const timelineRef = useRef(null);

    const project = useRef(
        new ProjectModel({
            autoLoad  : true,
            transport : {
                load : {
                    url : './data/launch-saas.json'
                }
            },
            // This config enables response validation and dumping of found errors to the browser console.
            // It's meant to be used as a development stage helper only so please set it to false for production systems.
            validateResponse : true
        })
    );

    // Timeline size change handler
    const setTimelineHeight = ({ source : button }) => {
        const timeline = timelineRef.current.instance;
        timeline.element.style.height = '';

        ['large', 'medium', 'small'].forEach(cls => timeline.element.classList.remove(cls));
        timeline.element.classList.add(button.text.toLowerCase());
    };

    return (
        <Fragment>
            {/* BryntumDemoHeader component is used for Bryntum example styling only and can be removed */}
            <BryntumDemoHeader />
            <div className="demo-toolbar">
                <label>Timeline size: </label>
                <BryntumButtonGroup
                    toggleGroup={true}
                    items={[
                        {
                            text : 'Small'
                        },
                        {
                            text    : 'Medium',
                            pressed : true
                        },
                        {
                            text : 'Large'
                        }
                    ]}
                    onToggle={setTimelineHeight}
                />
            </div>
            <BryntumTimeline
                ref={timelineRef}
                {...timelineConfig}
                project={project.current}
            />
            <BryntumGantt
                {...ganttConfig}
                project={project.current}
            />
        </Fragment>
    );
};

export default App;
