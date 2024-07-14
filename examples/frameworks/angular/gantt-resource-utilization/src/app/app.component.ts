import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Column, Gantt, Model, ResourceUtilization } from '@bryntum/gantt';
import { BryntumGanttComponent, BryntumResourceUtilizationComponent } from '@bryntum/gantt-angular';
import { ganttConfig, projectModelConfig, resourceUtilizationConfig } from './app.config';

@Component({
    selector      : 'app-root',
    templateUrl   : './app.component.html',
    styleUrls     : ['./app.component.scss'],
    encapsulation : ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
    public projectModelConfig = projectModelConfig;
    public ganttConfig = ganttConfig;
    public resourceUtilizationConfig = resourceUtilizationConfig;

    private gantt!: Gantt;
    private resourceUtilization!: ResourceUtilization;

    @ViewChild('gantt') ganttComponent!: BryntumGanttComponent;
    @ViewChild('resourceUtilization') resourceUtilizationComponent!: BryntumResourceUtilizationComponent;

    onBeforeCellEditStart({ editorContext }: { editorContext: { column: Column; record: Model }}) : boolean {
        return editorContext.column.field !== 'percentDone' || editorContext.record.isLeaf;
    }

    ngAfterViewInit(): void {
        // save instances (not used in this demo)
        this.gantt = this.ganttComponent.instance;
        this.resourceUtilization = this.resourceUtilizationComponent.instance;

        // make resource utilization a partner of gantt
        this.resourceUtilization.addPartner(this.gantt);
    }
}
