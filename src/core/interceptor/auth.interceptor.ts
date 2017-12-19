import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ng2-webstorage';
import {Observable} from 'rxjs/Observable';
import {InterceptedRequest, InterceptedResponse, Interceptor} from 'share';
import {Block} from '../block/block';
import {Token} from 'app/mlogin/login.user';

@Injectable()
export class AuthInterceptor implements Interceptor {

    constructor(private storage: LocalStorageService, private router: Router, private block: Block) {
    }

    request(request: InterceptedRequest): Observable<InterceptedRequest> | InterceptedRequest {
        let token: Token = this.storage.retrieve('token');
        if (!request.options.headers.has('Authorization') && !!token && !!token.access_token) {
            request.options.headers.set('Authorization', `Bearer ${token.access_token}`);
        }
        return request;
    }

    response(response: InterceptedResponse): Observable<InterceptedResponse> | InterceptedResponse {
        if (response.response.status === 401) {
            this.storage.clear('token');
            this.storage.clear('user');
            this.router.navigate(['login']);
            this.block.hideAll();
            toastr.clear();
            toastr.error('用户信息校验错误！');
            return Observable.throw(response.response);
        }
        if (response.response.status === 400) {
            this.storage.clear('token');
            this.storage.clear('user');
            this.router.navigate(['login']);
            this.block.hideAll();
            toastr.clear();
            let msg = '用户名、密码或验证码错误！';
            if (response.response['_body']) {
                let body = JSON.parse(response.response['_body']);
                if (body && body.msg) {
                    msg = body.msg;
                }
            }
            toastr.error(msg);
            return Observable.throw(response.response);
        }
        return response;
    }
}