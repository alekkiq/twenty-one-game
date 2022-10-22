"use strict";

/*
JAVASCRIPT DOM OOM Ventti peli
Aleksi Putkonen WEB20BL
*/


// pakan, käden ja kortin lisäys tiedostoistaan
import Pakka from "./pakka.js";
import Kasi from "./kasi.js";
import Kortti from "./kortti.js";

(function () {
    // määrityksiä
    let kasi, pakka, kortti;
    let p1, p2, j1, j2;
    let pelaajaKasi, pelaajaSumma, jakajaKasi, jakajaSumma;
    let pelaajaLkm;
    let jakajaLkm;

    let tulos = document.getElementById("tulos");
    const uusi = document.getElementById("uusipeli");
    const nosta = document.getElementById("nostanappi");
    const jää = document.getElementById("jaanappi");

    document.addEventListener("DOMContentLoaded", alusta);

    function alusta() {
        uusi.addEventListener("click", uusiPeli);
        nosta.addEventListener("click", nostaKortti);
        jää.addEventListener("click", jaa);

        kasi = new Kasi();
        pakka = new Pakka();
        kortti = new Kortti();
        pakka.sekoita();
        luoPelaajat();
        tarkistaVoittaja(pelaajaSumma, jakajaSumma);
        document.getElementById("pelaaja-maara").innerHTML = "Pelaajan käsi: " + pelaajaSumma;
        document.getElementById("jakaja-maara").innerHTML = "Jakajan käsi: " + jakajaSumma;
    }

    // pelaajien alkukorttien luonti
    function luoPelaajat() {
        //pelaaja
        p1 = pakka.otaKortti();
        p2 = pakka.otaKortti();
        kortti.luoKortti(pelaaja, p1);
        kortti.luoKortti(pelaaja, p2);
        pelaajaKasi = [p1.arvo, p2.arvo];
        pelaajaSumma = kasi.summa(pelaajaKasi);
        pelaajaLkm = 2;

        //jakaja
        j1 = pakka.otaKortti();
        j2 = pakka.otaKortti();
        kortti.luoKortti(jakaja, j1);
        kortti.luoKortti(jakaja, j2);
        jakajaKasi = [j1.arvo, j2.arvo];
        jakajaSumma = kasi.summa(jakajaKasi);
        jakajaLkm = 2;
    }

    // nosta kortti
    function nostaKortti() {
        let nostettu = pakka.otaKortti();
        kortti.luoKortti(pelaaja, nostettu);
        pelaajaKasi.push(nostettu.arvo);
        pelaajaSumma = kasi.summa(pelaajaKasi);
        pelaajaLkm++;
        tarkistaVoittaja(pelaajaSumma, jakajaSumma);
        document.getElementById("pelaaja-maara").innerHTML = "Pelaajan käsi: " + pelaajaSumma;
    }

    // jää
    function jaa() {
        while (jakajaSumma <= pelaajaSumma && jakajaLkm < 5) {
            let jakajanKortti = pakka.otaKortti();
            kortti.luoKortti(jakaja, jakajanKortti);
            jakajaKasi.push(jakajanKortti.arvo);
            jakajaSumma = kasi.summa(jakajaKasi);
            jakajaLkm++;
            tarkistaVoittaja(pelaajaSumma, jakajaSumma);
        }
        if (jakajaSumma > pelaajaSumma && jakajaSumma <= 21) {
            document.getElementById("tulos").innerHTML = `Jakaja voitti.`;
            piilotaNapit();
        }
        document.getElementById("jakaja-maara").innerHTML = "Jakajan käsi: " + jakajaSumma;

    }

    // voittajan tarkistus
    function tarkistaVoittaja(pelaajaKasi, jakajaKasi) {
        tulos = document.getElementById("tulos");

        // ällöttävä kasa if ja else if lauseita
        // toisenlainen ratkaisu työn alla
        if (pelaajaKasi === 21 && jakajaKasi != 21) {
            piilotaNapit();
            tulos.innerHTML = `Ventti!`;
        }
        else if (jakajaKasi === 21 && pelaajaKasi != 21) {
            piilotaNapit();
            tulos.innerHTML = `Jakajan ventti!`;
        }
        else if (pelaajaKasi > 21 && jakajaKasi <= 21) {
            piilotaNapit();
            tulos.innerHTML = `Yli meni. Jakaja voitti.`;
        }
        else if (jakajaKasi > 21 && pelaajaKasi <= 21) {
            piilotaNapit();
            tulos.innerHTML = `Voitto! Jakajalla yli.`;
        }
        else if (jakajaKasi === 21 && pelaajaKasi === jakajaKasi) {
            piilotaNapit();
            tulos.innerHTML = `Tasapeli?!`;
        }
        else if (jakajaKasi > 21 && pelaajaKasi > 21) {
            piilotaNapit();
            tulos.innerHTML = `Molemmilla yli..`;
        }
        else if (jakajaKasi <= 21 && jakajaLkm === 5) {
            piilotaNapit();
            tulos.innerHTML = `Jakajan voitto viidellä kortilla!`
        }
        else if (pelaajaLkm == 5 && pelaajaKasi <= 21) {
            piilotaNapit();
            document.getElementById("tulos").innerHTML = `Voitit viidellä kortilla!`;
        }
        else {
            tulos.innerHTML = `Korttien summa: ${pelaajaKasi}. Nosta tai jää.`;
        }
    }

    // nappien piilotus voittajan selvillä ollessa
    function piilotaNapit() {
        nosta.style.display = "none";
        jää.style.display = "none";
    }

    // uusi peli
    function uusiPeli() {
        location.reload();
    }
})();