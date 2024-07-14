import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppErrorHandler } from './error.handler';

import { AppComponent } from './app.component';
import { BryntumGanttModule } from '@bryntum/gantt-angular';

@NgModule({
    declarations : [
        AppComponent
    ],
    imports : [
        BrowserModule,
        BryntumGanttModule
    ],
    providers : [{ provide : ErrorHandler, useClass : AppErrorHandler }],
    bootstrap : [AppComponent]
})
export class AppModule { }
