import React from 'react';
import { BryntumButton } from '@bryntum/gantt-react';
import { useDispatch } from 'react-redux';
import { uiActions } from '../store/uiSlice';

export default function Toolbar() {
    const dispatch = useDispatch();

    return (
        <div className="demo-toolbar align-right">
            <BryntumButton
                icon="b-icon-search-minus"
                tooltip={'zoomOut'}
                onAction={() => {
                    dispatch(uiActions.zoom('Out'));
                }}
            ></BryntumButton>
            <BryntumButton
                icon="b-icon-search-plus"
                tooltip={'zoomIn'}
                onAction={() => {
                    dispatch(uiActions.zoom('In'));
                }}
            ></BryntumButton>
        </div>
    );
}
