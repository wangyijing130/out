import {NgModule} from '@angular/core';
import {ShareModule} from 'share';
import {MobileComponent} from './mobile.component';
import {MobileFooterComponent} from './mobile.footer.component';
import {mobileRouting} from './mobile.route';

@NgModule({
    imports: [ShareModule, mobileRouting],
    declarations: [MobileComponent, MobileFooterComponent],
    providers: []
})
export class MobileModule {
}