/**
 * App component script
 */
import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { BryntumGanttComponent, BryntumGridComponent, BryntumSplitterComponent } from '@bryntum/gantt-angular';
import { Gantt, Grid, Store } from '@bryntum/gantt';
import { ganttConfig, gridConfig } from './app.config';

@Component({
    selector      : 'app-root',
    templateUrl   : './app.component.html',
    styleUrls     : ['./app.component.scss'],
    encapsulation : ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
    title: string = document.title;
    ganttConfig = ganttConfig;
    gridConfig = gridConfig;

    private gantt!: Gantt;
    private grid!: Grid;
    private timeRangeStore!: Store;

    @ViewChild(BryntumGanttComponent, { static : false }) ganttComponent!: BryntumGanttComponent;
    @ViewChild(BryntumGridComponent, { static : false }) gridComponent!: BryntumGridComponent;
    @ViewChild(BryntumSplitterComponent, { static : false }) splitterComponent!: BryntumSplitterComponent;

    ngAfterViewInit(): void {
        // Store instance
        this.gantt = this.ganttComponent.instance;
        this.grid = this.gridComponent.instance;
        this.timeRangeStore = this.gantt.features.timeRanges.store;
        this.grid.store = this.timeRangeStore;
    }

    onAddRange(): void {
        this.timeRangeStore.add({
            name      : 'New range',
            startDate : new Date(2019, 1, 27),
            duration  : 5
        });
    }

    onShowHeaders({ checked }: any): void {
        this.gantt.features.timeRanges.showHeaderElements = checked;
    }
}
