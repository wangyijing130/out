import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PaginationComponent} from './pagination.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
@NgModule({
    imports: [CommonModule, NgbModule, FormsModule],
    declarations: [PaginationComponent],
    exports: [PaginationComponent]
})
export class PaginationModule {

}