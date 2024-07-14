import { Gantt, Grid, ScrollManager, ScrollManagerConfig } from '@bryntum/gantt';

declare class Drag {
    constructor({
        grid,
        gantt,
        scrollManager,
        outerElement

    }:{
        grid          : Grid
        gantt         : Gantt
        scrollManager : ScrollManager | Partial<ScrollManagerConfig>
        outerElement  : HTMLElement
    })
}

export { Drag };
