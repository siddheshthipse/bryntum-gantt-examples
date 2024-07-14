import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
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
    @ViewChild(BryntumGanttComponent) ganttComponent!: BryntumGanttComponent;

    private gantt!: Gantt;

    ganttConfig = ganttConfig;

    baselineCls: { [cls: string]: boolean } = {
        'b-hide-baseline-1' : false,
        'b-hide-baseline-2' : false,
        'b-hide-baseline-3' : false
    };

    ngAfterViewInit(): void {
        this.gantt = this.ganttComponent.instance;
    }
}
