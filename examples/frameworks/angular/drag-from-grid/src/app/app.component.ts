import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BryntumGanttComponent, BryntumGanttProjectModelComponent, BryntumGridComponent } from '@bryntum/gantt-angular';
import { Gantt, Grid } from '@bryntum/gantt';
import { ganttConfig, gridConfig, projectConfig } from './app.config';
import { Drag } from '../lib/Drag.js';

import { DataService } from './data.service';

@Component({
    selector      : 'app-root',
    templateUrl   : './app.component.html',
    styleUrls     : ['./app.component.scss'],
    encapsulation : ViewEncapsulation.None,
    providers     : [DataService]
})
export class AppComponent implements OnInit, AfterViewInit {

    tasks        = [];
    dependencies = [];
    resources    = [];
    assignments  = [];
    calendars    = [];
    timeRanges   = [];
    unplanned    = [];

    ganttConfig = ganttConfig;
    gridConfig = gridConfig;
    projectConfig = projectConfig;

    private dataSet = 0;
    private gantt!: Gantt;
    private grid!: Grid;

    @ViewChild(BryntumGanttComponent) ganttComponent!: BryntumGanttComponent;
    @ViewChild(BryntumGanttProjectModelComponent) project!: BryntumGanttProjectModelComponent;
    @ViewChild(BryntumGridComponent) gridComponent!: BryntumGridComponent;

    // Inject data service
    constructor(private dataService:DataService) {}
    ngAfterViewInit(): void {
        this.gantt = this.ganttComponent.instance;
        this.grid = this.gridComponent.instance;

        const { gantt, grid } = this;

        new Drag({
            grid,
            gantt,
            scrollManager : gantt.scrollManager,
            outerElement  : grid.element
        });
    }

    ngOnInit(): void {
        // Get initial data
        Object.assign(this, this.dataService.getData());
    }
}
