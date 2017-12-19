import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
@Component({
    selector: 'ai-mobile-footer',
    templateUrl: 'mobile.footer.component.html',
    styleUrls: ['mobile.footer.scss']
})
export class MobileFooterComponent {

    nav = 5;

    constructor(private router: Router) {

    }

    changeNav(nav) {
        this.nav = nav;
        let link = '';
        switch (nav) {
            case 1:
                link = `m/analytical`;
                break;
            case 2:
                link = `m/task`;
                break;
            case 3:
                link = `m/observe`;
                break;
            case 4:
                link = `m/alarm`;
                break;
            case 5:
                link = `m/personal`;
                break;
        }
        console.log(nav);
        link = `m/personal`;
        this.router.navigate([link]);
    }
}