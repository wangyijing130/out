import {RouterModule} from '@angular/router';
import {PersonalComponent} from './personal.component';

export const personalRouting = RouterModule.forChild([
    {
        path: '',
        component: PersonalComponent
    }
]);