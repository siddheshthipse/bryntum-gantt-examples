import { DateHelper } from '@bryntum/gantt';
import { BryntumButton, BryntumDemoHeader, BryntumGantt, BryntumGanttProjectModel } from '@bryntum/gantt-react';
import { useCallback, useRef, useState } from 'react';
import { ganttConfig, projectConfig } from './AppConfig';
import './App.scss';

import * as initialData from './initialData.js';

function App() {
    const gantt = useRef();
    const project = useRef();
    const [dataSet, setDataSet] = useState(0);

    const [tasks, setTasks] = useState(initialData.tasks);
    const [assignments, setAssignments] = useState(initialData.assignments);
    const [dependencies, setDependencies] = useState(initialData.dependencies);
    const [resources, setResources] = useState(initialData.resources);
    const [timeRanges, setTimeRanges] = useState(initialData.timeRanges);
    const [calendars, setCalendars] = useState(initialData.calendars);

    const dataChangeHandler = useCallback(() => {
        if (dataSet === 0) {
            setTasks([
                {
                    id       : 1,
                    name     : 'Task 1',
                    expanded : true,
                    children : [
                        { id : 11, name : 'Subtask 11', percentDone : 30, duration : 10 },
                        { id : 12, name : 'Subtask 12', percentDone : 67, duration : 5 }
                    ]
                },
                {
                    id       : 2,
                    name     : 'Task 2',
                    expanded : true,
                    children : [
                        { id : 21, name : 'Subtask 21', percentDone : 14, duration : 3 },
                        { id : 22, name : 'Subtask 22', percentDone : 94, duration : 7 },
                        { id : 23, name : 'Subtask 23', percentDone : 7, duration : 8 }
                    ]
                }
            ]);
            setDependencies([
                { id : 1, from : 11, to : 12 },
                { id : 2, from : 1, to : 21 },
                { id : 3, from : 21, to : 22 },
                { id : 4, from : 21, to : 23 }
            ]);
            setTimeRanges([
                {
                    id           : 1,
                    name         : 'Important date',
                    startDate    : DateHelper.add(DateHelper.clearTime(new Date()), 15, 'day'),
                    duration     : 0,
                    durationUnit : 'd',
                    cls          : 'b-fa b-fa-diamond'
                }
            ]);

            setDataSet(1);
        }
        else {
            setTasks(initialData.tasks);
            setAssignments(initialData.assignments);
            setDependencies(initialData.dependencies);
            setResources(initialData.resources);
            setTimeRanges(initialData.timeRanges);
            setCalendars(initialData.calendars);

            setDataSet(0);
        }
    }, [dataSet]);

    return (
        <>
            {/* BryntumDemoHeader component is used for Bryntum example styling only and can be removed */}
            <BryntumDemoHeader />
            <div className="demo-toolbar align-right">
                <BryntumButton
                    text="Change Data"
                    cls="b-raised b-blue"
                    onAction={dataChangeHandler}
                />
            </div>
            <BryntumGanttProjectModel
                ref={project}
                {...projectConfig}
                calendars={calendars}
                tasks={tasks}
                assignments={assignments}
                dependencies={dependencies}
                resources={resources}
                timeRanges={timeRanges}
            />
            <BryntumGantt
                ref={gantt}
                {...ganttConfig}
                project={project}
            />
        </>
    );
}

export default App;
