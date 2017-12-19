import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ng2-webstorage';
import {GlobalService} from 'app/global.service';
import {DomSanitizer} from '@angular/platform-browser';
import {LoginUser, Token} from 'app/mlogin/login.user';
@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.scss', '../mobile/common/header.scss']
})
export class MobileLoginComponent implements OnInit, AfterViewInit {

    username = '';
    password = '';
    verification_code: string; // 验证码
    error: string;
    codeUrl: any;
    valid_code: string; // 安全码
    requestCodeFlag = false;

    constructor(private router: Router, private global: GlobalService, private storage: LocalStorageService, private _sanitizer: DomSanitizer) {

    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    /* 获取验证码 **/
    getVerificationCode() {
        this.requestCodeFlag = true;
        this.codeUrl = '';
    }

    token(form) {
        this.error = '';
        if (form.invalid) {
            if (!this.username) {
                this.error = '用户名不能为空';
            }
            if (!this.password) {
                this.error = '密码不能为空';
            }
            if (!this.verification_code) {
                this.error = '验证码不能为空';
            }
            return;
        }
        let u = new LoginUser();
        u.user_name = this.username;
        u.nick_name = '黎明';
        u.mobile = '13548760801';
        u.email = 'liming@qq.com';
        u.id = 1;
        let token = new Token();
        token.access_token = '123456';
        this.storage.store('user', u);
        this.storage.store('token', token);
        this.global.updateUser(u);
        this.router.navigate(['m']);
    }

}