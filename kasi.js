"use strict";
export default class Kasi {
    summa(kasi) {
        let summa = kasi.reduce(function (a, b) {
            return parseInt(a) + parseInt(b);
        }, 0);
        return summa;
    }
}