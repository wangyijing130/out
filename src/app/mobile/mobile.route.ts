import {RouterModule} from '@angular/router';
import {MobileAuthGuardService} from 'core';
import {MobileComponent} from './mobile.component';

export const mobileRouting = RouterModule.forChild([
    {
        path: 'm',
        component: MobileComponent,
        canActivate: [MobileAuthGuardService],
        canActivateChild: [MobileAuthGuardService],
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'personal'},
            {
                path: 'personal',
                loadChildren: './personal/personal.module#PersonalModule',
                canActivate: [MobileAuthGuardService],
                canActivateChild: [MobileAuthGuardService]
            }
        ]
    }
]);

