// import { rimuoviClasse, aggiungiClasse } from "./functions.js";

// Sketchfab Viewer API: Start/Stop the viewer
let version = "1.12.1";
let uid = "82ebcb7f3306423293df06dcd3b7f830";
//let uid = "6c6f6b9b63324f8b9abdcc72ed0c67cc";76019ce17423460a9e40dced94538a4f

// Creo le variabili per le parti della nave sulla quale interagirò

let iframe = document.getElementById("api-frame");
let client = new Sketchfab(iframe);
var part0 = 81; //  alberi_vele_corde
let part1 = 318; //  piano1
let part2 = 1182; //  piano_2
let part3 = 1642; //  piano_3
let part4 = 2065; //  piano_4
const bgVar = "bg-red";

const sails = document.getElementById("sails");
const mainDeck = document.getElementById("mainDeck");
const upperDeck = document.getElementById("upperDeck");
const lowerDeck = document.getElementById("lowerDeck");
const hold = document.getElementById("hold");
const lowerHold = document.getElementById("lowerHold");
const floors = [sails, mainDeck, upperDeck, lowerDeck, hold, lowerHold];

let error = function error() {
  console.error("Sketchfab API error");
};

//creo le funzioni direttamente dentro il file perché su oxygen non posso importre facilemnte file js
function rimuoviClasse(param) {
  param.classList.remove(bgVar);
}

function aggiungiClasse(param) {
  param.classList.add(bgVar);
}

// creo la letiabile success dentro la quale viene salvata la funzione di avvio del viewer
//
let success = function success(api) {
  api.addEventListener("viewerready", function () {
    // document.getElementById("panel").classList.remove("hidden");
    api.getSceneGraph(function (err, result) {
      if (err) {
        console.log("Error getting nodes");
        return;
      } // get the id from that log
      //console.log(result);
    });

    /*  
    //dichiaro e inizializzo la variabili dei piani

    const floors = ["sails", "mainDeck", "upperDeck", "lowerDeck", "hold", "lowerHold"];
    for (let i = 0; i < floors.length; i++) {
      floors[i] = document.getElementById(floors[i]);
      //console.log(floors[i]);
    }
 */
    function mostraTutteParti() {
      for (let a = 0; a < floors.length - 1; a++) {
        console.log();
        api.show(eval("part" + a));
      }
    }

    function nascondoSingoloPiano(x) {
      for (let i = 0; i <= x; i++) {
        //console.log("cliccato su nascondi");
        api.hide(eval("part" + i));
      }
    }

    function nascondiParti(b) {
      for (let a = 0; a < 5; a++) {
        api.hide(eval("part" + a));
      }
    }

    /*

    PULSANTE -- SAILS --
    Lavoro codice del primo piano. Prima il codice si basava sul titolo del tasto floors[0].innerHTML.indexOf("Upper deck") != -1
    ora lavora sulla classe del tasto.

    */

    //aggiungo evento se viene cliccato il tasto
    sails.addEventListener("click", () => {
      if (sails.classList.contains(bgVar)) {
        console.log("ha la classe");
        //ripuliusco classe bg-red
        rimuoviClasse(sails);
        mostraTutteParti();
      } else {
        nascondoSingoloPiano(0);
        console.log("nascosto piano");
        aggiungiClasse(sails);
        console.log("aggiunto classe");
      }
    });
  });
};

client.init(uid, {
  success: success,
  error: error,
  autostart: 0,
  preload: 0,
});
