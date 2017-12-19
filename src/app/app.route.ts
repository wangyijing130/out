import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'mlogin'}
];

export const routing = RouterModule.forRoot(appRoutes, {useHash: true, preloadingStrategy: PreloadAllModules});
