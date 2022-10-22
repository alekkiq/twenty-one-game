"use strict";

export default class Kortti {
    constructor(maa, arvo) {
        this.maa = maa;
        this.arvo = arvo;
    }
    luoKortti(kenenKortit, x) {
        let parent;

        // kenelle kortti luodaan
        switch (kenenKortit) {
            case pelaaja:
                parent = document.getElementById("pelaaja-kortit");
                break;
            case jakaja:
                parent = document.getElementById("jakaja-kortit");
                break;
        }

        let kortti = document.createElement("div");
        kortti.setAttribute("class", "kortti")
        parent.appendChild(kortti);

        //kortin numerot + symbolit
        let ylaArvot = document.createElement("div");
        ylaArvot.setAttribute("class", `value-top ${x.maa}`);
        ylaArvot.innerHTML = `${x.arvo}<br>${x.maa}`;

        let alaArvot = document.createElement("div")
        alaArvot.setAttribute("class", `value-bottom ${x.maa}`);
        alaArvot.innerHTML = `${x.arvo}<br>${x.maa}`;

        let kortinMaa = document.createElement("div");
        kortinMaa.setAttribute("class", `${x.maa} maa`);
        kortinMaa.innerHTML = `${x.maa}`;

        kortti.appendChild(ylaArvot);
        kortti.appendChild(kortinMaa);
        kortti.appendChild(alaArvot);
    }
}