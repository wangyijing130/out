import {NgModule} from '@angular/core';
import {ShareModule} from 'share';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {MobileNodataComponent} from './nodata.component';
import {MobileHeaderComponent} from './header.component';
@NgModule({
    imports: [ShareModule, NgbModule, FormsModule],
    declarations: [MobileNodataComponent, MobileHeaderComponent],
    exports: [MobileNodataComponent, MobileHeaderComponent],
    providers: []
})
//  移动端公共组件
export class MobileCommonModule {
}