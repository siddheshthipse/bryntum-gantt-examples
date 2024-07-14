import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BryntumGanttComponent, BryntumGanttProjectModelComponent } from '@bryntum/gantt-angular';
import { ganttConfig, projectConfig } from './app.config';
import { DataService } from './data.service';

@Component({
    selector      : 'app-root',
    templateUrl   : './app.component.html',
    styleUrls     : ['./app.component.scss'],
    encapsulation : ViewEncapsulation.None,
    providers     : [DataService]
})
export class AppComponent implements OnInit {

    tasks        = [];
    dependencies = [];
    resources    = [];
    assignments  = [];
    calendars    = [];
    timeRanges   = [];

    ganttConfig = ganttConfig;
    projectConfig = projectConfig;

    @ViewChild('gantt') ganttComponent!: BryntumGanttComponent;
    @ViewChild('project') project!: BryntumGanttProjectModelComponent;

    // Inject data service
    constructor(private dataService:DataService) {}

    ngOnInit(): void {
        // Get initial data
        Object.assign(this, this.dataService.getData());
    }

    onChangeData(): void {
        Object.assign(this, this.dataService.getData());
    }

}
