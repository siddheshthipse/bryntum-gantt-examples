import { Component, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BryntumGanttComponent } from '@bryntum/gantt-angular';
import { Gantt } from '@bryntum/gantt';
import { ganttConfig } from './app.config';

@Component({
    selector      : 'app-root',
    templateUrl   : './app.component.html',
    styleUrls     : ['./app.component.scss'],
    encapsulation : ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
    ganttConfig = ganttConfig;
    private gantt: Gantt;

    @ViewChild(BryntumGanttComponent, { static : true }) ganttComponent: BryntumGanttComponent;

    ngAfterViewInit(): void {
        // Store Gantt instance
        this.gantt = this.ganttComponent.instance;
    }

}
