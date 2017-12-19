import {NgModule} from '@angular/core';
import {ShareModule} from 'share';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {PersonalComponent} from './personal.component';
import {personalRouting} from './personal.route';
import {MobileCommonModule} from 'app/mobile/common/common.module';
@NgModule({
    imports: [ShareModule, NgbModule, FormsModule, MobileCommonModule, personalRouting],
    declarations: [PersonalComponent],
    providers: []
})
export class PersonalModule {
}