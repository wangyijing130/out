import { RouterModule } from '@angular/router';
import { MobileLoginComponent } from './login.component';

export const mloginRoute = RouterModule.forChild([
    {path: 'mlogin', component: MobileLoginComponent}
]);
