import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Ng2Webstorage} from 'ng2-webstorage';
import {ShareModule} from 'share';
import {CoreModule} from '../core/core.module';
import {AppComponent} from './app.component';
import {routing} from './app.route';
import {GlobalService} from 'app/global.service';
import {MobileModule} from 'app/mobile/mobile.module';
import {MobileLoginModule} from 'app/mlogin/login.module';


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        CoreModule.forRoot(),
        NgbModule.forRoot(),
        ShareModule.forRoot(),
        Ng2Webstorage,
        MobileLoginModule,
        MobileModule,
        routing
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        GlobalService,
        {provide: Window, useValue: window},
        {provide: Document, useValue: document}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
