//import {globalAnnotations} from "./annotations.js"
let version = "1.12.1";
let uid = "82ebcb7f3306423293df06dcd3b7f830";
let iframe = document.getElementById("api-frame");
let client = new Sketchfab(iframe);
let soloMode = false;
let solo = document.getElementById("solo");
let annotationCount;
let annotationsList;
let animationVert;
let animatinHor;
let animationsList;
let buttonsText;
let anns = [];
let GUI;
let destroyGUI;
let annGoTo;
let bottoni = [];
let rows;
let api;
let tabella = document.getElementById("table-body");
const BtnOpenCloseModel = document.getElementById("open-close");
let testoSel = document.getElementById("testoSel");



const controls = document.getElementById("table");
const part0 = 81; //  alberi_vele_corde
const part1 = 315; //  piano1 1050, 1115
const part2 = 1172; //  piano_2
const part3 = 1630; //  piano_3
const part4 = 2053; //  piano_4
const part5 = 2419; // piano scafo inferiore
let bgVar = "bg-red";
const animationPiano = "f7bc1ed90f7c4f26b03386e626a09b74"; // UID Animazione della nave che si apre in piano
var audio = document.getElementById("myAudio");




//funzioni click
function playSound() {
  audio.load();
  audio.currentTime = 0;
  audio.play();
}


var anchorLink = "#masterVis";
/**
 * ASSEGNO UN ACHORLINK COMUNE A TUTTI
*/// assegna lo stesso attributo href a tutti gli elementi di ancoraggio
/* 
var links = document.querySelectorAll("#panel a");
for (var i = 0; i < links.length; i++) {
  links[i].setAttribute("href", anchorLink);
} */

/* var myElement = document.getElementById("frameC");
var myElement2 = document.getElementById("myEl");
var height = myElement.offsetHeight;
myElement2.textContent = "L'altezza dell'elemento è: " + height + "px";
 */

/*
CLASSI OGGETTI
*/
//classe Parti della Novara
class NovaraParts {
  constructor(name, id, cam) {
    this.id = id || "";
    this.name = document.getElementById(`${name}`);
    this.text = name;
    this.cam = cam;
  }
  setCam() {
    api.setCameraLookAt(this.cam.eye, this.cam.target);
  }
  resetCam() {
    api.setCameraLookAt(camReset.eye, camReset.target);
  }
}

class Bottoni {
  constructor(nome, id) {
    this.nome = nome;
    this.id = id;
  }
}

/*
CHECKBOX INPUT 
*/
function onChangeS() {
  if (solo.checked) {
    return true;
  } else {
    return false;
  }
}

/*
OGGETTI PARTI NAVE
*/
// Creo un oggetto per ogni parte della nave che voglio controllare
const iSails = new NovaraParts("sails", part0, camSA);
const iMainDeck = new NovaraParts("mainDeck", part1, camMD);
const iUpperDeck = new NovaraParts("upperDeck", part2, camUD);
const iLowerDeck = new NovaraParts("lowerDeck", part3, camLD);
const iHold = new NovaraParts("hold", part4, camHO);
const iLowerHold = new NovaraParts("lowerHold", part5, camLH);
const floors = [iSails, iMainDeck, iUpperDeck, iLowerDeck, iHold, iLowerHold];

let error = function error() {
  console.error("Sketchfab API error");
};

//creo le funzioni direttamente dentro il file perché su oxygen non posso importre facilemnte file js
function rimuoviClasse(param) {
  param.classList.remove(bgVar);
}

function rimuoviClassi() {
  //console.log("rimuovo tutte le classi");
  for (i = 0; i < floors.length; i++) {
    floors[i].name.classList.remove(bgVar);
  }
}

function aggiungiClassi() {
  //console.log("rimuovo tutte le classi");
  for (i = 0; i < floors.length; i++) {
    floors[i].name.classList.add(bgVar);
  }
}

function aggiungiClasse(param) {
  param.classList.add(bgVar);
}

function setCamera(ogg) {
  api.setCameraLookAt(ogg.eye, ogg.target);
}

function disabilitaButton() {
  BtnOpenCloseModel.disabled = true;
}

function riabilitaButton() {
  BtnOpenCloseModel.disabled = false;
}

//Verifica se è presente una classe bgVar. Se si nasconde
function verificaButtons() {
  for (i = 0; i < floors.length; i++) {
    if (floors[i].name.classList.contains(bgVar)) {
      //disabilitaButton();
      return true;
    } else {
      api.seekTo(2.45);
      //openModel();
    }
  }
}



//GUI TABELLA con annotazioni nel DOM
GUI = (ogg) => {
  const tableBody = document.getElementById("table-body");
  // Popola la tabella con i dati dell'array
  for (let i in ogg) {
    //for (let i = 0; i < annotationCount; i++) {
    // Crea una nuova riga
    const row = document.createElement("tr");
    row.classList.add("riga");

    // Crea la prima cella con il numero progressivo
    const indexCell = document.createElement("td");
    indexCell.textContent = parseInt(i) + 1;
    row.appendChild(indexCell);

    // Crea la seconda cella con il nome dell'elemento e aggiungi il tag "a" ad essa
    const nameCell = document.createElement("td");
    const link = document.createElement("a");
    link.href = anchorLink;
    link.textContent = ogg[i].name;
    link.classList.add("clickable");
    nameCell.appendChild(link);
    nameCell.classList.add("clickable");
    nameCell.setAttribute("onclick", "location.href='#0';");
    row.appendChild(nameCell);
    // Aggiungi un listener di click alla cella del nome
    nameCell.addEventListener("click", function () {
      audio.play();
      // Innesca la funzione api.goToAnnotation(index)
      api.gotoAnnotation(i);
      // console.log(i);
    });

    // Aggiungi la riga alla tabella
    tableBody.appendChild(row);
  }
};

//Distruggi UI TABELLA
destroyGUI = () => {
  var clearTableBtn = document.getElementById("table-body");
  var rows = clearTableBtn.getElementsByTagName("tr");
  while (rows.length > 1) {
    clearTableBtn.deleteRow(1);
  }
};

//////////////////////////////////////////////////////////////////////////
/*
    ANNOTAZIONI
*/
/////////////////////////////////////////////////////////////////////////
// Crea annotazione
function creaAnnotation(ogg) {
  rimuoviAnnotazioni();
  destroyGUI();
  for (let i in ogg) {
    api.createAnnotationFromScenePosition(
      ogg[i].position,
      ogg[i].eye,
      ogg[i].target,
      ogg[i].name,
      ogg[i].name,
      function (err, index) {
        if (!err) {
          //window.console.log("Created new annotatation", index + 1);
        }
      }
    );
  }
  GUI(ogg);
}
//funzione che salva tutte le annotazioni in un array
//salvataggio manuale delle annotazioni statiche
function listAnnotations() {
  api.getAnnotationList(function (err, annotations) {
    if (!err) {
      annotationsList = annotations;
      annotationCount = annotations.length;
      window.console.log(annotations);
    }
  });
}

//funzione che rimuove tutte le annotazioni
function rimuoviAnnotazioni() {
  api.removeAllAnnotations(function (err) {
    if (!err) {
      //console.log("Removed all annotations");
    }
    audio.play();
  });
}

//////////////////////////////////////////////////////////////////////////
/*
    ANIMAZIONI!!!
*/
/////////////////////////////////////////////////////////////////////////

const setFirstAnimation = () => {
  api.getAnimations((err, animations) => {
    // An animation is described by an array. The array contains an
    // ID and a length among others
    //console.log(animations);
    if (animations.length > 0) {
      api.setCurrentAnimationByUID(animationPiano, (err) => {
        api.seekTo(0);;
      });
    }
  });
};


function closeModel(animationPiano) {
  api.seekTo(2.45);
  // Ottiene l'ID dell'animazione dal nome
  api.getAnimations((err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // Imposta l'animazione in loop
    api.setCycleMode("one");
    // Imposta la velocità di riproduzione negativa
    api.setSpeed(-1);
    // Riproduce l'animazione
    api.play(animationPiano);
  });
  BtnOpenCloseModel.classList.remove("bg-color");
  BtnOpenCloseModel.classList.add("bg-green");
  BtnOpenCloseModel.textContent = "OPEN MODEL";
}

function openModel(animationPiano) {
  // Ottiene l'ID dell'animazione dal nome

  api.setSpeed(1);
  api.seekTo(0);
  // Riproduce l'animazione
  api.play(animationPiano);
  BtnOpenCloseModel.classList.remove("bg-green");
  BtnOpenCloseModel.classList.add("bg-color");
  BtnOpenCloseModel.textContent = "CLOSE MODEL";
}
function fra2Sec() {
  api.seekTo(3);
}
//--------------------------------------------------------------------------------------
//
// VIEWER READY
// creo la variabile success dentro la quale viene salvata la funzione di avvio del viewer
// EVENTO CHE SCATENA TUTTO
//
//--------------------------------------------------------------------------------------
let success = (apiClient) => {
  api = apiClient;

  api.addEventListener("viewerready", function () {
    // document.getElementById("panel").classList.remove("hidden");
    api.getSceneGraph(function (err, result) {
      if (err) {
        console.log("Error getting nodes");
        return;
      } // get the id from that log
      //console.log(result);
      audio.play();
      setTimeout(setFirstAnimation, 3000);
    });

    // Funzione che mostra tutti i pezzi della nave
    function mostraTutto() {
      for (let a = 0; a < floors.length; a++) {
        api.show(floors[a].id);
      }
    }
    function mostraSoloParte(parte) {
      api.show(floors[parte].id);
    }

    function nascondiTutto() {
      for (let a = 0; a < floors.length; a++) {
        api.hide(floors[a].id);
      }
    }

    // funzione che nasconde tutti i piani della nave fino a quello dato in input
    function nascondoFinoAlPiano(x) {
      for (let i = 0; i < x; i++) {
        //console.log("cliccato su nascondi");
        api.hide(floors[i].id);
      }
    }

    //funzione che nasconde solamente il piano che riceve in input
    function nascondiSoloParte(parte) {
      api.hide(floors[parte].id);
    }

    listAnnotations();
    //rimuoviAnnotazioni();

    /*
    ANIMATIONS
    */

    /*
    ////////////////////////////////////////////////////////////////////////////////
    PULSANTI -- 
    
    SAILS -- 
    MAN DECK --
    UPPER DECK --
    HOLD -- 
    LOWER HOLD  --
    
    //////////////////////////////////////////////////////////////////////////////////
    
    FUNZIONE CLICK DEI TASTI (SAILS, DECK VARI )
    
        */
    //aggiungo evento se viene cliccato il tasto
    function tastiAzioni(oggetto, piano, annotazione) {
      oggetto.name.addEventListener("click", () => {
        playSound();
        tabella.classList.remove("hidden");

        
        //se SOLO MODE NON ATTIVO - TUTTI I TASTI GRIGI
        if (!onChangeS()) {
          if (oggetto.name.classList.contains(bgVar)) {
            // MOSTRA TUTTO
            api.seekTo(2.45);
            mostraSoloParte(piano);
            rimuoviClasse(oggetto.name);
            mostraTutto();
            rimuoviAnnotazioni();
            oggetto.resetCam();
            tabella.classList.add("hidden-table");
            testoSel.classList.add("hidden");
            destroyGUI();
          }
          //Il tasto DIVENTA ROSSO e VISUALIZZA la parte selezionata
          else {
            api.seekTo(2.45);
            mostraTutto();
            //nascondoFinoAlPiano(piano);
            rimuoviClassi();
            rimuoviAnnotazioni();
            aggiungiClasse(oggetto.name);
            oggetto.setCam();
            creaAnnotation(annotazione);
            testoSel.innerHTML = "You have selected: " + `<b>${oggetto.name.textContent}</b>` ;
            testoSel.classList.remove("hidden");
            tabella.classList.remove("hidden-table");
          }
        }
        // SOLO MODE ATTIVO
        // SOLO MODE ATTIVO
        // SOLO MODE ATTIVO
        else {
          // Tasto DIVENTA GRIGIO e MOSTRA TUTTO
          if (oggetto.name.classList.contains(bgVar)) {
            api.seekTo(2.45);
            mostraTutto();
            rimuoviClasse(oggetto.name);
            rimuoviAnnotazioni();
            oggetto.resetCam();
            tabella.classList.add("hidden-table");
            testoSel.classList.add("hidden");
          }
          // Il tasto DIVENTA ROSSO VISUALIZZA SOLO LA PARTE
          else {
            api.seekTo(2.45);
            rimuoviClassi();
            nascondiTutto();
            mostraSoloParte(piano);
            aggiungiClasse(oggetto.name);
            rimuoviAnnotazioni();
            oggetto.setCam();
            creaAnnotation(annotazione);
            testoSel.innerHTML = "You have selected: " + `<b>${oggetto.name.textContent}</b>` ;
            testoSel.classList.remove("hidden");
            tabella.classList.remove("hidden-table");
          }
        }
        verificaButtons();
      });
    }

    function reset(oggetto) {
      oggetto.addEventListener("click", () => {
        rimuoviClassi();
        mostraTutto();
        rimuoviAnnotazioni();            
        testoSel.classList.add("hidden");
        api.setCameraLookAt(camReset.eye, camReset.target);

      });
    }

    function OpenCloseModel() {
      BtnOpenCloseModel.addEventListener("click", () => {
        playSound();
        api.addEventListener("animationPlay", disabilitaButton);

        api.addEventListener("animationStop", riabilitaButton);

        if (BtnOpenCloseModel.classList.contains("bg-color")) {
          closeModel();
        } else {
          openModel();
        }
      });
    }

    reset(solo);
    reset(BtnOpenCloseModel);
    tastiAzioni(iSails, 0, gaSails);
    tastiAzioni(iMainDeck, 1, gaMainDock);
    tastiAzioni(iUpperDeck, 2, gaUD);
    tastiAzioni(iLowerDeck, 3, gaLD);
    tastiAzioni(iHold, 4, gaHO);
    tastiAzioni(iLowerHold, 5, gaLH);
    OpenCloseModel();
  });
};

client.init(uid, {
  ui_infos: 0, // Usage: Setting to 0 will hide the model info bar at the top of the viewer.
  ui_inspector: 0, // Usage: Setting to 0 will hide the inspector button.
  ui_settings: 0, // Usage: Setting to 0 will hide the Settings button.
  ui_vr: 0, // Usage: Setting to 0 will hide the View in VR button.
  ui_ar: 0, // Usage: Setting to 0 will hide the View in AR button.
  ui_watermark_link: 0, // Usage: Setting to 0 remove the link from the Sketchfab logo watermark.
  ui_color: "00a8c0", // Usage: Setting to a hexidecimal color code (without the #) or a HTML color name will change the color of the viewer loading bar.
  ui_watermark: 0, // Usage: Setting to 0 remove the Sketchfab logo watermark.

  success: success,
  error: error,
  autostart: 0,
  preload: 0,
});
