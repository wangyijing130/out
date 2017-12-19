import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {WangEditorComponent} from './editor.component';

@NgModule({
    imports: [CommonModule, NgbModule, FormsModule],
    declarations: [WangEditorComponent],
    exports: [WangEditorComponent],
    providers: []
})
export class WangEditorModule {
}