import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {mloginRoute} from './login.route';
import { MobileLoginComponent } from './login.component';
@NgModule({
    imports: [
        mloginRoute,
        FormsModule,
        CommonModule
    ],
    declarations: [MobileLoginComponent],
    providers: []
})
export class MobileLoginModule {
}