import {Component, OnInit} from '@angular/core';
import {LoginUser} from 'app/mlogin/login.user';
import {GlobalService} from 'app/global.service';

@Component({
    selector: 'ai-mobile-nodata',
    templateUrl: 'nodata.component.html',
    styleUrls: ['./nodata.scss']
})
// 没有数据图标
export class MobileNodataComponent implements OnInit {

    user: LoginUser = new LoginUser();
    constructor(private globelService: GlobalService) {

    }
    ngOnInit(): void {
        this.globelService.user.subscribe(user => {
            this.user = user;
        });
    }
}