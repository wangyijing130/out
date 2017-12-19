import {Component, OnInit} from '@angular/core';
import {LoginUser} from 'app/mlogin/login.user';
import {GlobalService} from 'app/global.service';
@Component({
    selector: 'ai-mobile-personal',
    templateUrl: 'personal.component.html',
    styleUrls: ['./personal.scss']
})
export class PersonalComponent implements OnInit {

    user: LoginUser = new LoginUser();

    constructor(private globelService: GlobalService) {

    }

    ngOnInit(): void {
        this.globelService.user.subscribe(user => {
            this.user = user;
        });
    }
}