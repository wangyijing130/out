import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {EventManager} from 'share';
import {AceEditorDirective, AutoFocusDirective, EchartsDirective, TetherSelectDirective} from './directives';
import {
    JsonKeyValuePipe,
    KeysPipe,
    MaxlengthPipe,
    OrderByPipe,
    DateFmtPipe
} from './pipes';
import {ScrollBarModule} from './scroll-bar/scroll-bar.module';
import {NgbDatepickerI18n, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginationModule} from './pagination/pagination.module';
import {IslamicCivilI18n} from '../core/providers/date.datepickerI18n';

const COMPONENTS = [];
const DIRECTIVES = [
    AceEditorDirective,
    TetherSelectDirective,
    EchartsDirective,
    AutoFocusDirective
];
const PIPES = [
    KeysPipe,
    OrderByPipe,
    MaxlengthPipe,
    JsonKeyValuePipe,
    DateFmtPipe
];
const SERVICES = [
    EventManager
];
const MODULES = [
    CommonModule,
    // FormModule, // 对日期控件有冲突
    ScrollBarModule,
    PaginationModule
];

@NgModule({
    imports: [
        NgbModule,
        ...MODULES
    ],
    declarations: [
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES
    ],
    exports: [
        ...MODULES,
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES
    ]
})
export class ShareModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders> {
            ngModule: ShareModule,
            providers: [
                ...SERVICES, {
                    provide: NgbDatepickerI18n,
                    useClass: IslamicCivilI18n
                }
            ],
        };
    }
}