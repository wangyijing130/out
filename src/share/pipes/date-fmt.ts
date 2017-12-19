import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'datefmt'
})
export class DateFmtPipe implements PipeTransform {
    transform(value: any, fmt?: string): any {
        if (!fmt) {
            fmt = 'yyyy-MM-dd';
        }
        if (value && typeof value === 'string') {
            let d = new Date(value.replace(/-/g, '/'));
            return this.format(d, fmt);
        }
        if (value && value.getTime && value.getTime()) {
            return this.format(value, fmt);
        }
        return '';
    }

    format(d, fmt) {
        let o = {
            'M+': d.getMonth() + 1, // 月份
            'd+': d.getDate(), //  日
            'h+': d.getHours(), // 小时
            'm+': d.getMinutes(), // 分
            's+': d.getSeconds(), // 秒
            'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
            'S': d.getMilliseconds() // 毫秒
        };
        let ks = ['M+', 'd+', 'h+', 'm+', 's+', 'q+', 'S+'];
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        ks.forEach(k => {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        });
        return fmt;
    }

}