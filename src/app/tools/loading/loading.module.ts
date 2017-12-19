import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {LoadingComponent} from 'app/tools/loading/loading.component';
@NgModule({
    imports: [CommonModule, NgbModule, FormsModule],
    declarations: [LoadingComponent],
    exports: [LoadingComponent],
    providers: []
})
export class LoadingModule {

}