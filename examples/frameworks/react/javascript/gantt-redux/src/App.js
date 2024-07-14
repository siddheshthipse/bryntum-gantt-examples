import React from 'react';
import { BryntumDemoHeader } from '@bryntum/gantt-react';

import './App.scss';
import Gantt from './components/Gantt';
import Toolbar from './components/Toolbar';

function App() {
    return (
        <>
            {/* BryntumDemoHeader component is used for Bryntum example styling only and can be removed */}
            <BryntumDemoHeader/>
            <Toolbar/>
            <Gantt/>
        </>
    );
}

// If you plan to use stateful React collections for data binding please check this guide
// https://bryntum.com/products/gantt/docs/guide/Gantt/integration/react/data-binding

export default App;
