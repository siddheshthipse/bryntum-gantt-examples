/**
 * App component script
 */
import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Gantt, SchedulerPro, Toast } from '@bryntum/gantt';

import { BryntumGanttComponent, BryntumSchedulerProComponent } from '@bryntum/gantt-angular';
import { ganttConfig, project, schedulerProConfig } from './app.config';

@Component({
    selector      : 'app-root',
    templateUrl   : './app.component.html',
    styleUrls     : ['./app.component.scss'],
    encapsulation : ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {

    project = project;
    public ganttConfig = ganttConfig;
    public schedulerProConfig = schedulerProConfig;

    private gantt!: Gantt;
    private schedulerPro!: SchedulerPro;

    @ViewChild('gantt') ganttComponent!: BryntumGanttComponent;
    @ViewChild('schedulerpro') schedulerProComponent!: BryntumSchedulerProComponent;

    ngAfterViewInit(): void {
        this.gantt = this.ganttComponent.instance;
        this.schedulerPro = this.schedulerProComponent.instance;
        this.schedulerPro.addPartner(this.gantt);

        Toast.show({
            timeout : 3000,
            html    : 'Please note that this example uses the Bryntum Scheduler Pro, which is licensed separately.'
        });
    }
}
