"use strict";

import Kortti from "./kortti.js"
import { Maa } from "./maa.js"

const arvot = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
const symbolit = [Maa.PATA.symboli, Maa.RISTI.symboli, Maa.RUUTU.symboli, Maa.HERTTA.symboli];

export default class Pakka {
    constructor(kortit = luoPakka()) {
        this.kortit = kortit;
    }
    //sekoitus
    sekoita() {
        for (let i = this.kortit.length - 1; i > 0; i--) {
            const uusi = Math.floor(Math.random() * (i + 1));
            const vanha = this.kortit[uusi];
            this.kortit[uusi] = this.kortit[i];
            this.kortit[i] = vanha;
        }
    }
    //satunnaisen kortin nosto
    otaKortti() {
        const randomkortti = Math.floor(Math.random() * this.kortit.length);
        let krt = this.kortit[randomkortti];
        return this.kortit.splice(krt, 1)[0];
    }
}
// pakan luonti
function luoPakka() {
    return symbolit.flatMap(symboli => {
        return arvot.map(arvo => {
            return new Kortti(symboli, arvo)
        });
    });
}