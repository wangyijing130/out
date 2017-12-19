/**
 * Created by eking on 2017/11/30.
 */
const crypto = require('crypto');
const hash = crypto.createHash('sha1');
const Utf8 = require('crypto-js/enc-utf8');
export class Sha1 {
    static createSha1(str) {
        hash.update(str, Utf8);
        return hash.digest('hex').toString();
    }
}