import React, { useEffect, useRef } from 'react';
import { BryntumGantt, BryntumGanttProjectModel } from '@bryntum/gantt-react';
import { ganttConfig } from '../GanttConfig';
import { useDispatch, useSelector } from 'react-redux';
import { dataApi } from '../services/data';
import { uiActions } from '../store/uiSlice';

function Gantt() {
    const ganttRef = useRef();
    const projectRef = useRef();
    const dispatch = useDispatch();

    // Variables from global redux store
    const zoomAction = useSelector(state => state.ui.zoomAction);
    const dataset = useSelector(state => state.ganttData.dataset);

    const [trigger, { data, isLoading, isError, isUninitialized, error }] = dataApi.useLazyGetDataByNameQuery();

    useEffect(() => {
        trigger(dataset);
    }, [trigger, dataset]);

    useEffect(() => {
        if (zoomAction) {
            const gantt = ganttRef.current.instance;

            gantt[zoomAction]();

            dispatch(uiActions.zoom(null));
        }
    }, [dispatch, zoomAction]);

    // Render status messages if data is not (yet) available.
    if (isUninitialized) {
        return <h2 style={{ margin : 'auto' }}>Not started.</h2>;
    }
    if (isLoading) {
        return <h2 style={{ margin : 'auto' }}>Loading...</h2>;
    }
    if (isError) {
        return <h2 style={{ margin : 'auto' }}>{`Error: ${error.error}`}</h2>;
    }

    const { resources, tasks, dependencies, timeRanges, assignments, calendars, project } = data;

    // Gantt doing some calculations internally, copying to make Redux data changeable
    const copy = data => data.map(item => ({ ...item }));

    return (
        <>
            <BryntumGanttProjectModel
                ref={projectRef}
                {...project}
                calendars={copy(calendars)}
                tasks={copy(tasks)}
                assignments={copy(assignments)}
                dependencies={copy(dependencies)}
                resources={copy(resources)}
                timeRanges={copy(timeRanges)}
            />
            <BryntumGantt
                ref={ganttRef}
                {...ganttConfig}
                project={projectRef}
            />
        </>
    );
}

export default Gantt;
