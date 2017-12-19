import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ng2-webstorage';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {LoginUser, Token} from 'app/mlogin/login.user';

@Injectable()
export class GlobalService {
    token: BehaviorSubject<Token> = new BehaviorSubject<Token>(null);
    user: BehaviorSubject<LoginUser> = new BehaviorSubject<LoginUser>(null);

    constructor(private storage: LocalStorageService) {
        this.updateUser(this.storage.retrieve('user'));
        this.updateToken(this.storage.retrieve('token'));
    }

    updateToken(token: Token) {
        this.token.next(token);
    }

    updateUser(user: LoginUser) {
        this.user.next(user);
    }

}