/**
 * App component script
 */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BryntumGanttComponent } from '@bryntum/gantt-angular';
import { Gantt } from '@bryntum/gantt';
import ganttConfig from '../app.config';

@Component({
    selector    : 'app-home',
    templateUrl : 'home.page.html',
    styleUrls   : ['home.page.scss']
})
export class HomePage implements AfterViewInit {

    ganttConfig = ganttConfig;
    private gantt: Gantt;

    @ViewChild(BryntumGanttComponent, { static : false }) ganttComponent: BryntumGanttComponent;

    ngAfterViewInit(): void {
        // Store Gantt instance
        this.gantt = this.ganttComponent.instance;
    }

}
