import {NgbDate} from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';

export class AiDate extends NgbDate {

    static Parse(d) {
        if (!d) {
            return null;
        }
        if (d && typeof d === 'string') {
            d = new Date(d.replace(/-/g, '/'));
            return new AiDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
        }
        if (d && d.getTime && d.getTime()) {
            return new AiDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
        }
    }

    static fromObj(date) {
        return new AiDate(date.year, date.month, date.day);
    }

    // 获取 yyyy-MM-dd格式
    toString() {
        if (!this.year) {
            return '';
        }
        let str = '' + this.year;
        if (this.month < 10) {
            str += '-0' + this.month;
        } else {
            str += '-' + this.month;
        }
        if (this.day < 10) {
            str += '-0' + this.day;
        } else {
            str += '-' + this.day;
        }
        return str;
    }

    // 获取 yyyy-MM-dd HH:mm:ss格式
    toFullString() {
        if (!this.year) {
            return '';
        }
        let str = '' + this.year;
        if (this.month < 10) {
            str += '-0' + this.month;
        } else {
            str += '-' + this.month;
        }
        if (this.day < 10) {
            str += '-0' + this.day;
        } else {
            str += '-' + this.day;
        }
        return str + ' 00:00:00';
    }
}